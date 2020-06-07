const express = require('express');
// const auth = require('../middleWare/auth')
const usercontroller=require('../controller/usercontroller')
const enquirecontroller=require('../controller/enquireController')
var route = express.Router();

route.post('/register', usercontroller.registration);
route.post('/login', usercontroller.login);
route.post('/addEnquire',enquirecontroller.addEnquire)
route.get('/getAllEnquires',enquirecontroller.getAllEnquire)
module.exports = route