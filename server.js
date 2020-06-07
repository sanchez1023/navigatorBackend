const express = require('express')
const app = express();
const port = 3000;
const mongoose = require('mongoose');
var bodyPaser = require('body-parser')
const routes = require('./routes/routes');

const config = require('./database.config.js')
const expressValidator=require('express-validator');
console.log("congig-->" + config.databaseUrl);
app.use(bodyPaser.json())
app.use(bodyPaser.urlencoded({
    extended: true
}))

app.use(expressValidator())
 app.use('', routes);

app.get('/', (req, res) => { res.send("server connected") });
var client = mongoose.connect(config.databaseUrl, { useNewUrlParser: true }).then(() => {
  console.log("successfully conneted to dataBase");

})
app.listen(port, () => {
  console.log('Example app listening on port 3000!')
});