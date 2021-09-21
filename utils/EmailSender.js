const nodemailer = require('nodemailer');

class EmailSender{
    sendEmail(service, auth, recipient, subject, text){
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
            subject: subject,
            text: text
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