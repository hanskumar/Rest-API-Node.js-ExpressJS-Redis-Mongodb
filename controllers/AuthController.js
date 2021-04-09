const apiResponse   = require("../helpers/ApiResponse");
const User          = require("../models/UserModel");
const bcrypt        = require('bcrypt');



exports.login = async (req, res,next) => {

    try {
            const { emp_code, password } = req.body;
            const device_info = req.body.device_info ? req.body.device_info : null;
            
            //const result = await authSchema.validateAsync(req.body);

            const user = await User.findOne({emp_code : result.emp_code});
            
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
                return apiResponse.unauthorizedResponse(res, "Employee Code or Password wrong.");
            }
        

    } catch (err) {

        console.log(err);

        if(err.isJoi === true){ return apiResponse.validationErrorWithData(res, err.details[0].message); }

        return apiResponse.ErrorResponse(res, err);
    }
}