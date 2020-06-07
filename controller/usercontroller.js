var userService =require('../service/userService.js') ;

module.exports.registration = (req, res) => {
    var responseResult = {}

    console.log("request->" + JSON.stringify(req.body));
    var message = "welcome to goa singham "
    req.check('firstName').not().isEmpty().withMessage('userName must not be empty')
    req.check('userName').isEmail().withMessage('enter a valid email')
    req.check('password').not().isEmpty().isLength({ min: 5 }).withMessage('password must have min 5 characters').isLength({ max: 15 }).withMessage('password must have max 15 characters')
    req.check('mobileNumber').isLength({ min: 10, max: 10 }).withMessage('mobile number must be 10 number')
    // return res.status(200).send(message)

    const errors = req.validationErrors();
    console.log("erroerr-=-=>", errors);


    if (errors.length > 0) {
        console.log("in error find",errors);


        return res.status(422).json({
            success: false,
            message: errors[0].msg,
        })
    }
    else {

        // return res.status(200).send(message)
        userService.registration(req.body, (error, result) => {
            if (error) {


                return res.status(500).send(error)
            }
            else {
                console.log("result in controller" + result);

                responseResult.status = true,
                    responseResult.message = "registration successfull"
                return res.status(200).send(result)
            }
        })

    }
}
module.exports.login = (req, res) => {
    var responseResult = {}
    req.check('userName').isEmail().withMessage('email address  is badly formatted')
    req.check('password').not().isEmpty().isLength({ min: 5 }).withMessage('password must have min 5 characters').isLength({ max: 15 }).withMessage('password must have max 15 characters')


    const errors = req.validationErrors();
    console.log("erroerr-=-=>", errors);
    if (errors.length > 0) {
        return res.status(422).json({
            success: false,
            message: errors[0].msg,
        })
    }
    else {
        console.log("data in controller==>" + req.body);

        userService.login(req.body, (error, result) => {
            if (error) {
                return res.status(500).send(error)
            }
            else {
                responseResult = result
                return res.status(200).send(responseResult)
            }
        })
    }

}