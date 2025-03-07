import { ServerClient } from "postmark";

if (!process.env.POSTMARK_SERVER_TOKEN) {
  throw new Error("POSTMARK_SERVER_TOKEN is required");
}

const client = new ServerClient(process.env.POSTMARK_SERVER_TOKEN);
export default client;