const bcrypt = require('bcrypt');
const saltRounds = 10;

module.exports.bcrypt = (req, callback) => {
    console.log("request in bycrypt"+req);
    
    bcrypt.genSalt(saltRounds, function (err, salt) {
        bcrypt.hash(req, salt, function (err, hash) {

            if (err) {
                callback(err)

            }
            else {
            console.log("hash" + hash);

                callback(null, hash)
            }
        }
        )
    })

}

