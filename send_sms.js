// Twilio Credentials
// To set up environmental variables, see http://twil.io/secure
const accountSid = process.env.TWILIO_ACCOUNT_SID;
const authToken = process.env.TWILIO_AUTH_TOKEN;
const to_phone = process.env.TO_PHONE;
const from_phone = process.env.FROM_PHONE;

// require the Twilio module and create a REST client
const client = require("twilio")(accountSid, authToken);

client.messages
  .create({
    to: to_phone,
    from: from_phone,
    body: "A user tried to sign up!",
  })
  .then((message) => console.log(message.sid));
