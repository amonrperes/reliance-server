const nodemailer = require('nodemailer');
const Logging = require('./Logging');

const logging = new Logging;
class EmailSender{
    sendEmail(service, auth, recipient, activationCode){
        const defaultSubject = 'Realiance Activation Code';
        const defaultText = `You was invited to Reliance!\nUse this code activate your account and setup your username and password\n${activationCode}`
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