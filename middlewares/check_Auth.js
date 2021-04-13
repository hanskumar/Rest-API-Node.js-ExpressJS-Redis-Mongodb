/*
 * Middleware to check  auth token
*/
const JWT           = require('jsonwebtoken');
const apiResponse   = require("../helpers/ApiResponse");

module.exports = function (req, res, next) {

        const authHeader = req.headers['authorization'] || req.headers['x-access-token'];
        if(authHeader){

            var token  = req.headers.authorization.split("Bearer ")[1] || undefined;

            JWT.verify(token, process.env.JWT_ACCESS_TOKEN_SECRET, function(error, payload) {
                if (error) {
                    //console.log(error);
                    return apiResponse.unauthorizedResponse(res, "Unautharized Request");
                } else {
                    req.payload = payload;
                    var authenticated = true;
                    next();
                }
            });
        } else {
            return apiResponse.unauthorizedResponse(res, "Unautharized Error");
        }
}
