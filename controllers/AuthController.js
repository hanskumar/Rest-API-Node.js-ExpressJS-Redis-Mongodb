const apiResponse   = require("../helpers/ApiResponse");
const User          = require("../models/UserModel");
const bcrypt        = require('bcrypt');

const {authSchema,profileSchema,RegistrationSchema,ChangePasswordSchema} =  require("../validation/validation_schema");

const { loginAccessToken,signAccessToken,signRefreshToken } = require('../config/JwtToken')


exports.authanticate = async (req, res,next) => {

    try {
            const { email,grantType,phone } = req.body;
            const device_info = req.body.device_info ? req.body.device_info : null;

            //const result = await authSchema.validateAsync(req.body);

            if(grantType == 'email'){
                //var query = { email : result.email };
                var NextAction = 'Password';
                var tokenKey = email;

            } else if(grantType == 'phone'){
                //var query = { phone : result.phone };
                var NextAction = 'PIN';
                var tokenKey = phone;
            } else {
                return apiResponse.validationErrorWithData(res, "Somthing went Wrong,Please try again."); 
            }
            
            let Data = {
                status : "Pending",
                nextAction :NextAction,
            };

            const accessToken = await loginAccessToken(tokenKey)

            Data.token = accessToken;

            return apiResponse.successResponseWithData(res,"Login Next Action", Data);
    

    } catch (err) {

        console.log(err);

        if(err.isJoi === true){ return apiResponse.validationErrorWithData(res, err.details[0].message); }

        return apiResponse.ErrorResponse(res, err);
    }
}


exports.login = async (req, res,next) => {

    try {
            const { email, password,grantType,phone } = req.body;
            const device_info = req.body.device_info ? req.body.device_info : null;

            const result = await authSchema.validateAsync(req.body);

            if(grantType == 'email'){
                var query = { email : result.email };

            } else if(grantType == 'phone'){
                var query = { phone : result.phone };
            }
            
            const user = await User.findOne(query);
            
            //----- If User found then login--------------//
            if (user){

                const isMatch = await user.isPasswordMatch(result.password);

                if(!isMatch){
                    return apiResponse.unauthorizedResponse(res, "Employee Code or Password are invalid.");
                }

                if(user.status == "active"){

                    let userData = {
                        _id: user._id,
                        emp_code:user.emp_code,
                        name: user.name,
                        phone: user.phone,
                        email: user.email,
                        role: user.role,
                        status : user.status,
                        profile_image :user.profile_image,
                    };

                    const accessToken = await signAccessToken(user.id)
                    //const refreshToken = await signRefreshToken(user.id)

                    //Prepare JWT token for authentication
                    /* const jwtPayload = userData;
                    const jwtData = {
                        expiresIn: process.env.JWT_TIMEOUT_DURATION,
                    };
                    const secret = process.env.JWT_SECRET; */
                    //Generated JWT token with Payload and secret.
                    userData.accessToken = accessToken;

                    return apiResponse.successResponseWithData(res,"Login Success.", userData);

                } else {
                    return apiResponse.unauthorizedResponse(res, "Account is not confirmed. Please confirm your account.");
                }
                
            } else {
                //----------Register New User------------------//


            }
        

    } catch (err) {

        console.log(err);

        if(err.isJoi === true){ return apiResponse.validationErrorWithData(res, err.details[0].message); }

        return apiResponse.ErrorResponse(res, err);
    }
}