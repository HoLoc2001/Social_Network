const nodemailer = require("nodemailer");
const { OAuth2Client } = require("google-auth-library");

const myOAuth2Client = new OAuth2Client(
  process.env.GOOGLE_MAILER_CLIENT_ID,
  process.env.GOOGLE_MAILER_CLIENT_SECRET
);

myOAuth2Client.setCredentials({
  refresh_token: process.env.GOOGLE_MAILER_REFRESH_TOKEN,
});

let myAccessTokenObject;
myOAuth2Client.getAccessToken().then(function (data) {
  myAccessTokenObject = data;
});
const myAccessToken = myAccessTokenObject?.token;
const transport = nodemailer.createTransport({
  service: "gmail",
  auth: {
    type: "OAuth2",
    user: process.env.ADMIN_EMAIL_ADDRESS,
    clientId: process.env.GOOGLE_MAILER_CLIENT_ID,
    clientSecret: process.env.GOOGLE_MAILER_CLIENT_SECRET,
    refresh_token: process.env.GOOGLE_MAILER_REFRESH_TOKEN,
    accessToken: myAccessToken,
  },
});

module.exports = transport;
