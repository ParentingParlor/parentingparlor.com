import { db } from "@/db";
import sendEmail from "@/feature/email/sendEmail";
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