export interface D1HttpClientConfig {
  accountId: string;
  databaseId: string;
  token: string;
}

export interface D1DatabaseLike {
  prepare(sql: string): any;
  batch(statements: any[]): Promise<any[]>;
  exec(sql: string): Promise<any>;
}

/**
 * Lightweight, zero-dependency Cloudflare D1 client over HTTPS REST API.
 * Compatible with drizzle-orm/d1 and Cloudflare D1 SQL query specifications.
 */
export function createD1HttpClient(config: D1HttpClientConfig): D1DatabaseLike {
  const { accountId, databaseId, token } = config;
  const endpoint = `https://api.cloudflare.com/client/v4/accounts/${accountId}/d1/database/${databaseId}/query`;

  async function queryD1(body: any) {
    const res = await fetch(endpoint, {
      method: "POST",
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify(body),
    });

    if (!res.ok) {
      const text = await res.text();
      throw new Error(`Cloudflare D1 HTTP Error (${res.status}): ${text}`);
    }

    const json = (await res.json()) as {
      success: boolean;
      errors?: Array<{ message: string }>;
      result?: Array<{
        results?: any[];
        success?: boolean;
        meta?: Record<string, any>;
      }>;
    };

    if (!json.success) {
      const msg = json.errors?.map((e) => e.message).join(", ") || "Cloudflare D1 query failed";
      throw new Error(msg);
    }

    return json.result || [];
  }

  return {
    prepare(sql: string) {
      let boundParams: any[] = [];
      const stmt: any = {
        _sql: sql,
        _params: boundParams,
        bind(...values: any[]) {
          boundParams = values;
          stmt._params = values;
          return stmt;
        },
        async run() {
          const body = stmt._params.length > 0 ? { sql, params: stmt._params } : { sql };
          const results = await queryD1(body);
          const first = results[0] || {};
          return {
            success: first.success ?? true,
            meta: first.meta ?? {},
          };
        },
        async all() {
          const body = stmt._params.length > 0 ? { sql, params: stmt._params } : { sql };
          const results = await queryD1(body);
          const first = results[0] || {};
          return {
            results: first.results || [],
            success: first.success ?? true,
            meta: first.meta ?? {},
          };
        },
        async raw() {
          const body = stmt._params.length > 0 ? { sql, params: stmt._params } : { sql };
          const results = await queryD1(body);
          const first = results[0] || {};
          const rows = first.results || [];
          return rows.map((r: any) => Object.values(r));
        },
        async first(colName?: string) {
          const body = stmt._params.length > 0 ? { sql, params: stmt._params } : { sql };
          const results = await queryD1(body);
          const first = results[0] || {};
          const row = first.results?.[0];
          if (!row) return null;
          return colName ? row[colName] : row;
        },
      };
      return stmt;
    },
    async batch(statements: any[]) {
      const batchPayload = statements.map((s) => ({
        sql: s._sql,
        ...(s._params?.length ? { params: s._params } : {}),
      }));
      const results = await queryD1({ batch: batchPayload });
      return results.map((r) => ({
        results: r.results || [],
        success: r.success ?? true,
        meta: r.meta ?? {},
      }));
    },
    async exec(sql: string) {
      const results = await queryD1({ sql });
      return {
        count: results.length,
        duration: results.reduce((acc: number, r: any) => acc + (r.meta?.duration || 0), 0),
      };
    },
  };
}
