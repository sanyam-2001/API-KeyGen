var nodemailer = require('nodemailer');
const sendMail = (email, subject, body) => {
    var transporter = nodemailer.createTransport({
        service: 'gmail',
        auth: {
            user: 'apikeygennpm@gmail.com',
            pass: 'pineconegingerbread'
        }
    });
    const mailOptions = {
        from: 'apikeygennpm@gmail.com', // sender address
        to: email, // list of receivers
        subject: subject, // Subject line
        html: body
    };
    transporter.sendMail(mailOptions, function (err, info) {
        if (err)
            console.log(err)
        else
            console.log(info);
    });
}

module.exports = sendMail