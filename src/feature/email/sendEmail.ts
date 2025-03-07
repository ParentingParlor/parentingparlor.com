import emailClient from "./emailClient";

export default async function sendEmail(props: {
  to: string;
  subject: string;
  textBody: string;
  htmlBody?: string;
}) {
  if (!process.env.FROM_EMAIL) {
    throw new Error("FROM_EMAIL is not defined");
  }
  const response = await emailClient.sendEmail({
    From: process.env.FROM_EMAIL,
    To: props.to,
    Subject: props.subject,
    TextBody: props.textBody,
    HtmlBody: props.htmlBody,
  });
  return response;
}
