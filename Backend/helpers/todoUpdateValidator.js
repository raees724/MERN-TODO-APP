import Joi from "joi";

const validator = (schema) => (payload) => 
    schema.validate(payload,{abortEarly:false});


const todoSchema = Joi.object({
    title:Joi.string(),
    description:Joi.string().min(3),
    date:Joi.string(),
    id:Joi.string(),
    isCompleted:Joi.boolean()
})

export const todoUpdatevalidator = validator(todoSchema);