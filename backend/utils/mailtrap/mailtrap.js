import { MailtrapClient } from "mailtrap";

const TOKEN = "c6ec9928339f3934493e2f22ef178d89";

const mailTrapClient = new MailtrapClient({
  token: TOKEN,
});

export { mailTrapClient };
