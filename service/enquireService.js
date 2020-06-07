const enquireModel = require('../models/enquireModel.js')


exports.addNewEnquire = (data, callback) => {
    console.log("in serviceof enquire"  + JSON.stringify(data));

    enquireModel.addEnquire(data, (error, result) => {
        if (error) {
            callback(error, null)
        }
        else {
            callback(null, result)
        }
    })

}

exports.getAllEnquires=(data,callback)=>{
    console.log("in serviceof enquire"  + JSON.stringify(data));

    enquireModel.getAllEnquiry(data, (error, result) => {
        if (error) {
            callback(error, null)
        }
        else {
            callback(null, result)
        }
    })
}