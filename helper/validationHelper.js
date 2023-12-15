const Joi = require('joi')
const schemas = {
    userRegisterSchema: Joi.object().keys({
        username: Joi.string().required().min(3).max(10),
        password: [Joi.string().required().min(5), Joi.number()]
    }),
    userUpdateSchema: Joi.object().keys({
        username: Joi.string().min(5).max(10),
        password: [Joi.string().min(5).max(10), Joi.number().min(5).max(10)]
    }),
    productSaveSchema: Joi.object().keys({
        name: Joi.string().required().min(3).max(20),
        description: Joi.string().required().min(5).max(50),
        price: Joi.number().required().greater(0.00)
    }),
    productUpdateSchema: Joi.object().keys({
        name: Joi.string().min(3).max(20),
        description: Joi.string().min(5).max(50),
        price: Joi.number().greater(0.00)
    })
}

module.exports = schemas;
