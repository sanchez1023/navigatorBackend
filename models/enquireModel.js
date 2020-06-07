const mongoose = require('mongoose');
const sendMail = require('../middleware/nodeMailer.js')


const enquireSchema = mongoose.Schema({

    name: {
        type: String,
        required: [true, "Name is required"]
    },



    email: {
        type: String,

        required: [true, "email is required"]
    },


    message: {
        type: String,
        maxLength: 300,
        required: [true, "message  is required"]
    },
    created: { type: Date, default: Date.now() }

},
    {
        " timestamps": true

    }



)

const enquire = mongoose.model("enquire", enquireSchema);

function enquireModel() {

}
enquireModel.prototype.addEnquire = (data, callback) => {
    var newEnquire = new enquire(data)
    newEnquire.save((error, result) => {

        if (error) {
            console.log("error", error);

            callback(error)
        }
        else {
            console.log("value of result", result);
            // sendMail.sendMail(result.name, (error, data));
            var response = {
                success: true,
                message: "enquire added succesfully",
                data: []
            }
            callback(null, response)
        }

    })
}

enquireModel.prototype.getAllEnquiry = (data, callback) => {

    enquire.find({}, (error, data) => {
        if (error) {
            callback(error)
        }
        else {
            let response = {
                success: true,
                message: "all  enquires  retrived successfully",
                data: data

            }
            callback(null, response)

        }
    })
}


module.exports = new enquireModel()