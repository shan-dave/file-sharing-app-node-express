const res = require('express/lib/response')
const nodemailer = require('nodemailer')

async function sendMail({from, to, subject, text, html}) {
    let transpoter = nodemailer.createTransport({
        host: 'smtp-relay.sendinblue.com',
        port: 587,
        secure: false,
        auth: {
            user: 'daveshantanu95@gmail.com',
            pass: 'Jgh8v3nfP2YjIHWr'
        }
    })

    let info = await transpoter.sendMail({
        from: `InShare <${from}>`,
        to,
        subject,
        text,
        html
    })
    return info
}


module.exports = sendMail