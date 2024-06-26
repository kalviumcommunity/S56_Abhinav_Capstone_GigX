const Joi = require('joi');

const userValidationSchema = Joi.object({
    name: Joi.string().required(),
    email: Joi.string().email().required(),
    phone: Joi.string().pattern(/^[0-9]{6,14}$/).required(), 
    role: Joi.string().required(),
    company: Joi.string(),
    password: Joi.string().required(),
    freelancer: Joi.boolean().required(),
    skills: Joi.array().items(Joi.string()),
    location: Joi.string(),
    country: Joi.string(),
    experience: Joi.string(),
    profilePic: Joi.string(),
});

// contact us validation
const contactValidationSchema = Joi.object({
    name: Joi.string().required(),
    email: Joi.string().email().required(),
    phone: Joi.string().pattern(/^[0-9]{6,14}$/).required(), 
    message: Joi.string().required()
});

// projects validation
const projectValidationSchema = Joi.object({
    user: Joi.string().required(),
    projectName: Joi.string().required(),
    endDate: Joi.date().iso().required(),
    skillsRequired: Joi.string().required(),
    referenceDocument: Joi.string(),
    budget: Joi.number().required(),
    description: Joi.string().required(),
    assignedTo: Joi.string().allow(null)
});

module.exports = {
    userValidationSchema,
    contactValidationSchema,
    projectValidationSchema
};
