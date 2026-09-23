import { defineConfig } from "tsup";

export default defineConfig({
  entry: {
    embed: "src/index.ts",
  },
  format: ["iife"],
  outDir: "../../apps/web/public",
  outExtension() {
    return {
      js: ".js",
    };
  },
  clean: false,
  minify: true,
  dts: false,
  sourcemap: true,
});
