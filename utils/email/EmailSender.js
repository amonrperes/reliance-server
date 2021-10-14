const nodemailer = require('nodemailer');
const Logging = require('../log/Logging');

const logging = new Logging;
class EmailSender{
    sendEmail(service, auth, recipient, activationCode){
        const defaultSubject = 'Realiance Activation Code';
        const defaultText = `You were invited to Reliance!\nUse this code to activate your account and setup your username and password\n${activationCode}`;
        defaultText.replace(activationCode, '<b>' + activationCode + '</b>');

        logging.generalOperation('sendEmail');
        let transporter = nodemailer.createTransport({
            host: service,
            port: 587,
            secure: false,
            requireTLS: true,
            auth: {
                user: auth.user,
                pass: auth.pass
            }    
        });

        let sender = auth.user;
        let mailOptions = {
            from: sender,
            to: recipient,
            subject: defaultSubject,
            text: defaultText
        };

        transporter.sendMail(mailOptions, (error, info) => {
            if (error) {
              console.log(error);
            } else {
              console.log('Email sent: ' + info.response);
            }
        });
    }
}

module.exports = EmailSender;