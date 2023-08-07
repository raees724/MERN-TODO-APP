import Joi from "joi";

const validator = (schema) => (payload) => 
    schema.validate(payload,{abortEarly:false});


const todoSchema = Joi.object({
    title:Joi.string().required(),
    description:Joi.string().min(3).required(),
    date:Joi.string().required()
})

export const validateTodo = validator(todoSchema);