import { db } from "@/db";
import { betterAuth } from "better-auth";
import { drizzleAdapter } from "better-auth/adapters/drizzle";
import { magicLink } from "better-auth/plugins/magic-link";

export const auth = betterAuth({
  database: drizzleAdapter(db, {
    provider: "pg"
  }),
  plugins: [
    magicLink({
      sendMagicLink: async ({ email, token, url }, request) => {
        // send email to user
      }
    })
  ]
});