const Joi = require('joi')
const schemas = {
    userRegisterSchema: Joi.object().keys({
        username: Joi.string().required().min(3).max(10),
        password: [Joi.string().required().min(5), Joi.number()]
    }),
    userUpdateSchema: Joi.object().keys({
        username: Joi.string().min(5).max(10),
        password: [Joi.string().min(5).max(10), Joi.number().min(5).max(10)]
    })
}

module.exports = schemas;