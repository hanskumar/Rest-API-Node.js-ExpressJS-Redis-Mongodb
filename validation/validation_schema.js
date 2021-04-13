    const Joi = require('joi');

    const authSchema = Joi.object({ 
        grantType: Joi.string().required()
        .messages({
            'string.empty': `grantType cannot be an empty field`,
        }),
        email: Joi.string()
        .messages({
            'string.empty': `email cannot be an empty field`
        }),

        /* phone: Joi.string().min(10).max(10).required()
        .messages({
            'string.empty': `phone cannot be an empty field`,
            'string.min': `phone should have a minimum length of {#limit}`,
        }), */
        phone:Joi.string(),
        device_info:Joi.string()
    })

    /* const RegistrationSchema = Joi.object({ 
        emp_code: Joi.string().required()
        .messages({
            'string.empty': `emp_code cannot be an empty field`,
        }),
        name: Joi.string().required()
        .messages({
            'string.empty': `name cannot be an empty field`,
        }),
        phone: Joi.string().required().min(10).max(10)
        .messages({
            'string.empty': `phone cannot be an empty field`,
        }),
        email: Joi.string().required()
        .messages({
            'string.empty': `email cannot be an empty field`,
        }),
        password: Joi.string().min(6).required(),
        device_info:Joi.string()
        .messages({
            'string.empty': `Password cannot be an empty field`,
            'string.min': `Password should have a minimum length of {#limit}`,
            'any.required': `Password is a required field`
        }),
    }) */

    const profileSchema = Joi.object({ 
        emp_code: Joi.string().required()
        .messages({
            'string.empty': `Employee Code cannot be an empty field`,
            'any.required': `Employee Code is a required field`
        }),
        device_info:Joi.string(),
        phone:Joi.string(),
        address:Joi.string()   
    })

    const ChangePasswordSchema = Joi.object({ 
        emp_code: Joi.string().required()
        .messages({
            'string.empty': `Employee Code cannot be an empty field`,
            'any.required': `Employee Code is a required field`
        }),
        new_password: Joi.string().min(6).required()
        .messages({
            'string.empty': `New Password cannot be an empty field`,
        }),
        current_password: Joi.string().min(6).required()
        .messages({
            'string.empty': `Current Password cannot be an empty field`,
        }),
        device_info:Joi.string() 
    })

    const LeaveSchema = Joi.object({ 
        emp_code: Joi.string().required()
        .messages({
            'string.empty': `Employee Code cannot be an empty field`,
            'any.required': `Employee Code is a required field`
        }),
        leave_type: Joi.string().required()
        .messages({
            'string.empty': `Leave Type cannot be an empty field`,
        }),
        leave_from: Joi.string().required()
        .messages({
            'string.empty': `Leave From cannot be an empty field`,
        }),
        leave_to: Joi.string().required()
        .messages({
            'string.empty': `Leave to cannot be an empty field`,
        }),
        reason: Joi.string().required()
        .messages({
            'string.empty': `reason to cannot be an empty field`,
        }),
        device_info:Joi.string() 
    })
  
  
    module.exports = {
        authSchema,profileSchema,LeaveSchema,ChangePasswordSchema
    }


    