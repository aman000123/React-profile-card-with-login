


const Joi = require('joi');

const createUsersSceema = Joi.object({

    file: Joi.object().required(),

    fname: Joi.string().required().min(4).required().messages({
        'any.required': "First name is a required field"
    }),
    lname: Joi.string().required().messages({
        'any.required': "Last name is a required field"
    }),
    email: Joi.string().email({ minDomainSegments: 2, tlds: { allow: ['com', 'net'] } }),

    phone: Joi.string().regex(/^[0-9]{10}$/).required(),

    password: Joi.string().pattern(new RegExp('^[a-zA-Z0-9]{3,30}$')),

    country: Joi.string().required(),

    address: Joi.string(),

    gender: Joi.string(),















})

module.exports = {
    createUsersSceema
}