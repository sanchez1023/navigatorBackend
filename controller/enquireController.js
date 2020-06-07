var enquireService =require('../service/enquireService.js') ;


module.exports.addEnquire = (req, res) => {
    var responseResult = {}

    console.log("request->" + JSON.stringify(req.body));
    // var message = "welcome to goa singham "
    req.check('name').not().isEmpty().withMessage('Name must not be empty')
    req.check('email').isEmail().withMessage('enter a valid email')
    // req.check('password').not().isEmpty().isLength({ min: 5 }).withMessage('password must have min 5 characters').isLength({ max: 15 }).withMessage('password must have max 15 characters')
    req.check('message').isLength({ min: 10, max: 300 }).withMessage('message  must be 10 characters')
    // return res.status(200).send(message)

    const errors = req.validationErrors();
    console.log("erroerr-=-=>", errors);


    if (errors !== false) {
        console.log("in error find",errors);


        return res.status(422).json({
            success: false,
            message: errors[0].msg,
        })
    }
    else {
        console.log("in else",req.body);

        // return res.status(200).send(message)
        enquireService.addNewEnquire(req.body, (error, result) => {
            if (error) {
                console.log("res",error);
                

                return res.status(500).send(error)
            }
            else {
                console.log("result in controller" + result);

                responseResult.status = true,
                    responseResult.message = "enquire added successfull"
                return res.status(200).send(result)
            }
        })

    }
}
module.exports.getAllEnquire=(req,res)=>{
    var responseResult = {}

    enquireService.getAllEnquires(req.body, (error, result) => {
        if (error) {


            return res.status(500).send(error)
        }
        else {
            console.log("result in controller" + result);

            responseResult.status = true,
                responseResult.message = "enquire added successfull"
            return res.status(200).send(result)
        }
    })


}