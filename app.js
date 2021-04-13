//configure global variables
require("dotenv").config();

const express       = require('express')
const app           = express();
const rateLimit     = require('express-rate-limit');
const bodyParser    = require('body-parser');
const mongoose      = require('mongoose');
const mongoSanitize = require('express-mongo-sanitize');
const helmet        = require('helmet');
const apiRouter     = require("./routes/ApiRoutes");

/**
 * DB Connect
*/
const connection = require('./config/DbConnect')();


//Data sanitization against NoSQL query injection
app.use(mongoSanitize());


const limiter = rateLimit({
    windowMs: 15 * 60 * 1000, // 15 minutes
    max: 100, // limit each IP to 100 requests per windowMs
    message: 'Too many requests from this Ip, na wao, please try again after one hour',
});
  
//  apply to all requests
app.use(limiter);

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));



app.use("/v1/", apiRouter);

/* GET Welcome page. */
app.get("/", function(req, res) {
	res.send({ msg: "Welcome to Classified App Node API" });
});

/**
 * Start Express server.
*/
app.listen(process.env.PORT, () => {
    console.log(`Server is stated on http://localhost:${process.env.PORT}`)
});

module.exports = app;