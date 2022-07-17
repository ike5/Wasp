require("dotenv").config();
// Twilio Credentials
// To set up environmental variables, see http://twil.io/secure
const accountSid = process.env.TWILIO_ACCOUNT_SID;
const authToken = process.env.TWILIO_AUTH_TOKEN;
const to_phone = process.env.TO_PHONE;
const from_phone = process.env.FROM_PHONE;

const client = require("twilio")(accountSid, authToken);

let time = new Date();

module.exports = {
  send: client.messages
    .create({
      body: `A user tried to sign up! Date: ${time.toLocaleDateString()}, Time: ${time.toLocaleTimeString()}`,
      messagingServiceSid: "MGaecff4005786e522eea6e90100f1303c",
      to: to_phone,
    })
    .then((message) => console.log(message.sid))
    .done(),
};
