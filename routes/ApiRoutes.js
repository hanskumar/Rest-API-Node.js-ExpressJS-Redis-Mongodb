/**
 * Load Depandancies
*/
const express = require("express");
const router  = express.Router();


const AuthController        = require("../controllers/AuthController");

/**
 * ==================  Define All API End Points Here========================
*/

/*-------------First Action with either Email or Phone----------------------*/
router.post("/authanticate",AuthController.authanticate);

/*-------------------Login Routes with password or OTP---------------*/
router.post("/login",AuthController.login);



module.exports = router;