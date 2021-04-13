/**
 * Load Depandancies
*/
const express = require("express");
const router  = express.Router();

const Auth = require("../middlewares/check_Auth");
const AuthController        = require("../controllers/AuthController");
const CommanController      = require("../controllers/CommanController");

/**
 * ==================  Define All API End Points Here========================
*/

/*-------------First Action with either Email or Phone----------------------*/
router.post("/authanticate",AuthController.authanticate);

/*-------------------Login Routes with password or OTP---------------*/
router.post("/login",AuthController.login);

router.get("/categoies",CommanController.categoryList);



module.exports = router;