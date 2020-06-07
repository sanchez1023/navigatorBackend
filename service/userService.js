const userModel = require('../models/userModel.js')


exports.registration = (data, callback) => {
    userModel.register(data, (error, result) => {
        if (error) {
            callback(error, null)
        }
        else {
            console.log("result in service===>" + result);

            callback(null, result)
        }

    })

}
exports.login = (data, callback) => {
    console.log("in service of login " + data);

    userModel.login(data, (error, result) => {
        if (error) {
            callback(error, null)
        }
        else {
            callback(null, result)
        }
    })

}