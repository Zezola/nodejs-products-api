const Joi = require('joi');

const validate = (schema) => {
    return (req, res, next) => {
        const {error} = schema.validate(req.body);
        if (error == null) {
            next();
        } else {
            const { details } = error;
            const message = details.map(i => i.message).join('');
            res.status(400).json({error: message})
        }
    }
}

module.exports = validate;