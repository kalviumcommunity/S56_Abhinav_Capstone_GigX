const Joi = require('joi');

const userValidationSchema = Joi.object({
    name: Joi.string().required(),
    email: Joi.string().email().required(),
    phone: Joi.number().integer().required(),
    role: Joi.string().required(),
    company: Joi.string().required(),
    password: Joi.string().required(),
    freelancer: Joi.boolean().required()
});

module.exports = {
    userValidationSchema
};
