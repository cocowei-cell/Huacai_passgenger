const objectIdReg = /^[0-9a-fA-F]{24}$/;
const Joi = require('joi');
module.exports = validateID = obj => {
    const Schema = {
        _id: Joi.string().regex(objectIdReg).required().error(new Error('The id is wrong!'))
    }
    return Joi.validate(obj, Schema, {
        abortEarly: true,
        allowUnknown: true
    });
}

