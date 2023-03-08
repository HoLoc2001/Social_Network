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

  signInValidate = (data) => {
    const signInSchema = Joi.object({
      email: Joi.string()
        .email({ tlds: { allow: false } })
        .required(),
      password: Joi.string().min(8).max(12).required(),
    });

    return signInSchema.validate(data);
  };

  emailValidate = (data) => {
    const emailSchema = Joi.object({
      email: Joi.string()
        .email({ tlds: { allow: false } })
        .required(),
    });

    return emailSchema.validate(data);
  };

  passwordValidate = (data) => {
    const passwordSchema = Joi.object({
      password: Joi.string().min(8).max(12).required(),
      newPassword: Joi.string().min(8).max(12).required(),
    });

    return passwordSchema.validate(data);
  };
}

module.exports = new Validation();
