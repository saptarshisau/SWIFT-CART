import nodeMailer from 'nodemailer'
/*Your Node app cannot speak SMTP by itself.

Nodemailer creates an SMTP client.

Your App
     │
     ▼
Transporter (SMTP Client)
     │
     ▼
smtp.gmail.com
*/
export const sendEmail = async (options) => {
    const transporter = nodeMailer.createTransport({
        service: process.env.SMTP_SERVICE,
        auth: {
            user: process.env.SMTP_MAIL,
            pass: process.env.SMTP_PASSWORD
        }
    })
    const mailOptions = {
        from: process.env.SMTP_MAIL,
        to: options.email,
        subject: options.subject,
        text: options.message
    }
    await transporter.sendMail(mailOptions);
    /**Each transporter knows
host
port
authentication
TLS settings */
}