const mongoose = require('mongoose');
var jwt = require('jsonwebtoken');
const privateKey = require('../database.config');
const sendMail = require('../middleware/nodeMailer')
const bycrption = require('../middleware/bycrpt')
const bcrypt = require('bcrypt');

const userSchema = mongoose.Schema({

    firstName: {
        type: String,
        required: [true, "firstName is required"]
    },

    lastName: {
        type: String,
        required: [true, "lastName is required"]
    },

    userName: {
        type: String,
        unique: true,
        required: [true, "userName is required"]
    },

    password: {
        type: String,

        required: [true, "Password is required"]
    },
    mobileNumber: {
        type: Number,
        maxLength: 11,
        required: [true, "mobile number is required"]
    }
},
    {
        " timestamps": true

    }



)

const user = mongoose.model("user", userSchema);

function userModel() {

}

userModel.prototype.register = async (data, callback) => {
    console.log("data in userModel" + data);
    user.find({ userName: data.userName }, (err, userData) => {
        console.log("data in fin one=>" + userData.length);

        if (err) {
            callback(err, null)
        }
        else {
            if (userData.length > 0) {
                callback({
                    success: false,
                    message: "userName already exists",
                    data: ""
                }

                )

            }
            else {

                bycrption.bcrypt(data.password, (error, result) => {
                    if (error) {
                        callback(error)
                    }
                    else {
                        console.log("password ==>" + result);

                        data.password = result
                        var newUser = new user(data)
                        newUser.save((error, result) => {
                            if (error) {
                                callback(error, null)
                            }
                            else {

                                //   sendMail.sendMail(result.userName, (err, data));
                                console.log("data of node mailer==>" + data);

                                var response = {
                                    success: true,
                                    message: "confirmation email has been send to your registered email",
                                    data: data.mes
                                }


                                callback(null, response)
                            }
                        }
                        )


                    }

                })
            }



        }
    })


}
userModel.prototype.login = (data, callback) => {
    console.log("data in login model" + data);
    user.findOne({ userName: data.userName }, (err, userData) => {
        if (err) {
            console.log("error");
            callback(err, null)

        } else {
            // console.log("user data pass word"+userData.password);

            if (userData) {
                bcrypt.compare(data.password, userData.password, (error, result) => {
                    if (error) {
                        callback(error, null)
                    }
                    else {
                        jwt.sign({ userName: userData.userName, id: userData.id }, privateKey.privateKey, function (err, token) {
                            console.log("token in jwt---==>", token);
                            if (token) {
                                callback(null, {
                                    success: true,
                                    message: "login Successful",
                                    data: {
                                        email: userData.userName,
                                        firstName: userData.firstName,
                                        lastName: userData.lastName,
                                        token: token
                                    }
                                })
                            }
                        });
                    }
                })






            } else {

                callback({
                    success: false,
                    message: "invalid userName or password",
                    data: []
                })
            }
        }
    })

}
module.exports = new userModel()