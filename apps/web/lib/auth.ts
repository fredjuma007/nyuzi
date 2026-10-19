import { betterAuth } from "better-auth";
import { drizzleAdapter } from "better-auth/adapters/drizzle";
import { db } from "./db";
import * as schema from "@nyuzi/db";

import nodemailer from "nodemailer";
import { setGlobalDispatcher, Agent } from "undici";

// Configure Undici with Happy Eyeballs to prevent IPv6 connect timeouts on mobile/local networks
try {
  setGlobalDispatcher(
    new Agent({
      connect: {
        autoSelectFamily: true,
        autoSelectFamilyAttemptTimeout: 250,
      },
    })
  );
} catch {}

const transporter = nodemailer.createTransport({
  service: "gmail",
  auth: {
    user: process.env.SMTP_USER || "circuitschapters@gmail.com",
    pass: process.env.SMTP_PASS, // Gmail 16-character App Password
  },
});

export const auth = betterAuth({
  database: drizzleAdapter(db, {
    provider: "sqlite",
    schema: {
      user: schema.user,
      session: schema.session,
      account: schema.account,
      verification: schema.verification,
    },
  }),
  trustedProviders: ["google", "github"],
  account: {
    accountLinking: {
      enabled: true,
      trustedProviders: ["google", "github"],
    },
  },
  emailAndPassword: {
    enabled: true,
    autoSignIn: true,
    sendResetPassword: async (data, request) => {
      // 1. Always log the link to the terminal in dev as an instant backup:
      console.log("\n=======================================================");
      console.log("🔐 [NYUZI PASSWORD RESET LINK]");
      console.log("To:", data.user.email);
      console.log("Reset URL:", data.url);
      console.log("=======================================================\n");

      // 2. Dispatch real email via Nodemailer if SMTP_PASS is configured:
      if (process.env.SMTP_PASS) {
        try {
          await transporter.sendMail({
            from: '"Nyuzi Support" <circuitschapters@gmail.com>',
            to: data.user.email,
            subject: "Reset your Nyuzi password",
            html: `
              <div style="font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Helvetica, Arial, sans-serif; max-width: 520px; margin: 0 auto; padding: 32px 24px; border: 1px solid #e2e8f0; border-radius: 20px; background-color: #ffffff; color: #0f172a;">
                <div style="margin-bottom: 24px; display: flex; align-items: center; gap: 8px;">
                  <span style="font-size: 20px; font-weight: bold; color: #0f172a;">Nyuzi<span style="color: #f56220;">Yap</span></span>
                </div>
                <h2 style="font-size: 20px; font-weight: 700; color: #0f172a; margin: 0 0 12px 0;">Reset your password</h2>
                <p style="color: #475569; font-size: 14px; line-height: 1.6; margin: 0 0 24px 0;">
                  Hello ${data.user.name || "there"},<br/>
                  We received a request to reset your Nyuzi publisher password. Click the button below to choose a new password:
                </p>
                <div style="margin: 28px 0;">
                  <a href="${data.url}" style="background-color: #f56220; color: #ffffff; padding: 12px 28px; border-radius: 12px; text-decoration: none; font-weight: bold; font-size: 14px; display: inline-block;">
                    Reset Password →
                  </a>
                </div>
                <p style="color: #94a3b8; font-size: 12px; line-height: 1.5; margin: 24px 0 0 0; border-top: 1px solid #f1f5f9; padding-top: 16px;">
                  If you didn't request a password reset, you can safely ignore this email. This link will expire shortly.
                </p>
              </div>
            `,
          });
          console.log(`[EMAIL DISPATCHED] Password reset email sent to ${data.user.email} via circuitschapters@gmail.com`);
        } catch (err) {
          console.error("[EMAIL ERROR] Failed to send reset email via Nodemailer:", err);
        }
      }
    },
  },
  socialProviders: {
    github: {
      clientId: process.env.GITHUB_CLIENT_ID || "",
      clientSecret: process.env.GITHUB_CLIENT_SECRET || "",
      enabled: Boolean(process.env.GITHUB_CLIENT_ID && process.env.GITHUB_CLIENT_SECRET),
    },
    google: {
      clientId: process.env.GOOGLE_CLIENT_ID || "",
      clientSecret: process.env.GOOGLE_CLIENT_SECRET || "",
      enabled: Boolean(process.env.GOOGLE_CLIENT_ID && process.env.GOOGLE_CLIENT_SECRET),
    },
  },
  secret: process.env.BETTER_AUTH_SECRET || "nyuzi-secret-key-development-min-32-characters-entropy",
  baseURL:
    process.env.BETTER_AUTH_URL ||
    (process.env.VERCEL_PROJECT_PRODUCTION_URL
      ? `https://${process.env.VERCEL_PROJECT_PRODUCTION_URL}`
      : process.env.VERCEL_URL
      ? `https://${process.env.VERCEL_URL}`
      : "http://localhost:3000"),
  trustedOrigins: [
    "http://localhost:3000",
    "http://127.0.0.1:3000",
    "http://localhost:3001",
    "http://127.0.0.1:3001",
    "http://localhost:3002",
    "https://nyuzi-yap.vercel.app",
    ...(process.env.VERCEL_URL ? [`https://${process.env.VERCEL_URL}`] : []),
    ...(process.env.VERCEL_PROJECT_PRODUCTION_URL
      ? [`https://${process.env.VERCEL_PROJECT_PRODUCTION_URL}`]
      : []),
  ],
});

export type Auth = typeof auth;
