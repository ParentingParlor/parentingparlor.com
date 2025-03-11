import { db } from "@/db";
import sendEmail from "@/feature/email/sendEmail";
import { betterAuth } from "better-auth";
import { drizzleAdapter } from "better-auth/adapters/drizzle";
import { magicLink } from "better-auth/plugins/magic-link";

if (!process.env.GOOGLE_CLIENT_ID) {
  throw new Error("GOOGLE_CLIENT_ID is not set");
}

if (!process.env.GOOGLE_CLIENT_SECRET) {
  throw new Error("GOOGLE_CLIENT_SECRET is not set");
}

export const auth = betterAuth({
  database: drizzleAdapter(db, {
    provider: "pg"
  }),
  socialProviders: {
    google: {
      clientId: process.env.GOOGLE_CLIENT_ID,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET,
    },
  },
  plugins: [
    magicLink({
      sendMagicLink: async ({ email, token, url }, request) => {
        console.log(`Sending magic link to ${email}...`)
        await sendEmail({
          htmlBody: `<a href="${url}">Click here to sign in</a>`,
          subject: "Parenting Parlor",
          to: email,
          textBody: `Click here to sign in: ${url}?token=${token}`
        });
        console.log('Magic link sent!')
      }
    })
  ]
});