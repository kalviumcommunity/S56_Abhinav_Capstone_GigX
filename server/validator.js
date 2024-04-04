const Joi = require('joi');

const userValidationSchema = Joi.object({
    name: Joi.string().required(),
    email: Joi.string().email().required(),
    phone: Joi.string().pattern(/^\+(?:[0-9] ?){6,14}[0-9]$/).required(),
    role: Joi.string().required(),
    company: Joi.string(),
    password: Joi.string().required(),
    freelancer: Joi.boolean().required(),
    skills: Joi.array().items(Joi.string()),
    location: Joi.string(),
    country: Joi.string(),
    experience: Joi.string()
});

module.exports = {
    userValidationSchema
};
