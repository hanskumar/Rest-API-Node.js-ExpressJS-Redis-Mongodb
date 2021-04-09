/**
 * Load Depandancies
*/
const express = require("express");
const router  = express.Router();


const AuthController        = require("../controllers/AuthController");

/**
 * ==================  Define All API End Points Here========================
*/

router.post("/login",AuthController.login);



module.exports = router;