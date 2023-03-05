const Joi = require("joi");

class Validation {
  signUpValidate = (data) => {
    const signUpSchema = Joi.object({
      email: Joi.string()
        .email({ tlds: { allow: false } })
        .required(),
      password: Joi.string().min(8).max(12).required(),
      birthday: Joi.date().required(),
      firstName: Joi.string().required(),
      lastName: Joi.string().required(),
      gender: Joi.valid("M", "F").required(),
      city: Joi.string(),
    });

    return signUpSchema.validate(data);
  };
}

module.exports = new Validation();
