import Joi from "joi";

const validator = (schema) => (payload) => 
    schema.validate(payload,{abortEarly:false});


const signupSchema = Joi.object({
    email:Joi.string().email().required(),
    password:Joi.string().min(6).required(),
    username:Joi.string().min(3).required()
})

export const validateSignup = validator(signupSchema);