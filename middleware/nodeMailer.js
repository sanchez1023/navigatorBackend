nodeMailer = require('nodemailer'),


    module.exports.sendMail = (req, sendBack) => {
        console.log("value of request in mailer",req);
        
        let transporter = nodeMailer.createTransport({
            host: 'smtp.gmail.com',
            port: 465,
            secure: true,
            auth: {
                user: 'fundooapp1234@gmail.com',
                pass: 'fundoo1234'
            }
        });
        let mailOptions = {
            from: '"4Navigators" <fundooapp1234@gmail.com>', // sender address
            to: req, // list of receivers
            subject: "Thank you for enquire on 4navigators.com", // Subject line
            text: "Thank you for your enquire on 4navigators.com , our team will get in contact with you on your submitted email address regarding your queries", // plain text body
            html: '<b>To check more packages please click on the below link   http://4navigators.com</b>' // html body

        };
        transporter.sendMail(mailOptions, (error, info) => {
            if (error) {
                // return console.log(error);
                sendBack({
                    error: error
                })
            }
            else {
                sendBack(null, {
                    info: info.messageId
                })
            }

            console.log('Message %s sent: %s', info.messageId, info.response);
            res.render('index');
        });


    }

module.exports.forgotMail = (req, sendBack) => {
    let url = "http://www.4navigators.com" 
    let transporter = nodeMailer.createTransport({
        host: 'smtp.gmail.com',
        port: 465,
        secure: true,
        auth: {
            user: 'navigateus4@gmail.com',
            pass: 'Navi@2019'
        }
    });
    let mailOptions = {
        from: '"4navigators" <navigateus4@gmail.com>', // sender address
        to: req.userName, // list of receivers
        subject: "Thank you for your enquire at 4navigators.com", // Subject line
        text: "Thank you for your enquire our team will get in contact you regarding your queries using your submitted email address ", // plain text body
        html: '<b>To check more packages click on the below link </b>' + url // html body

    };
    transporter.sendMail(mailOptions, (error, info) => {
        if (error) {
            // return console.log(error);
            sendBack({
                error: error
            })
        }
        else {
            sendBack(null, {
                info: info.messageId
            })
        }

        console.log('Message %s sent: %s', info.messageId, info.response);
        res.render('index');
    });


}