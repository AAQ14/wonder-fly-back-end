const { MailtrapClient } = require("mailtrap");
const dotenv = require("dotenv")
dotenv.config()

const TOKEN = process.env.MAILTRAP_TOKEN
const ENDPOINT = process.env.MAILTRAP_ENDPOINT 

exports.mailtrapClient = new MailtrapClient({
endpoint: ENDPOINT,
  token: TOKEN,
});

exports.sender = {
  email: "mailtrap@demomailtrap.co",
  name: "Wonderfly",
};
