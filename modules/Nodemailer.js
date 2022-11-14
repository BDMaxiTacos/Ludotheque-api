const Nodemailer = require('nodemailer');
const NodemailerConfig = require('../config/nodemailer.json');

const NodemailerModules = {
  register: require('./Mailer/Register'),
};

let transporter = Nodemailer.createTransport({
  host: NodemailerConfig.HOST,
  port: NodemailerConfig.PORT,
  secure: false,
  auth: {
    user: NodemailerConfig.USERNAME,
    pass: NodemailerConfig.PASSWORD,
  },
});

async function sendMail(USE = 'UNKNOWN', DATA = {}, MAILS = ['stan.lubineau@gmail.com'], SUBJECT = NodemailerConfig.DEFAULT_SUBJECT, MESSAGE = NodemailerConfig.DEFAULT_MESSAGE) {
  let mailAddrString = '';
  MAILS.forEach((mail) => {
    mailAddrString += `${mail} `;
  });

  let mailTemplate = null;
  switch (USE) {
    case 'REGISTER':
      mailTemplate = NodemailerModules.register(DATA);
      break;
    case 'UNKNOWN':
    default:
      break;
  }

  await transporter.sendMail({
    from: `${NodemailerConfig.SENDER_NAME} <${NodemailerConfig.SENDER_MAIL}>`,
    to: mailAddrString,
    subject: SUBJECT,
    text: MESSAGE,
    html: `${mailTemplate}`,
  });

  console.log('MAIL SEND');
}

module.exports = {
  sendMail,
};
