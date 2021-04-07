//configure global variables
require("dotenv").config();

const express       = require('express')
const app           = express();
const rateLimit     = require('express-rate-limit');
const bodyParser    = require('body-parser');
const mongoose      = require('mongoose');




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