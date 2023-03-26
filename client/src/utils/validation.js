import Joi from "joi";

export const signUpValidate = (data) => {
  const signUpSchema = Joi.object({
    email: Joi.string()
      .email({ tlds: { allow: false } })
      .required(),
    firstName: Joi.string().max(50).required(),
    lastName: Joi.string().max(50).required(),
    birthday: Joi.date().required(),
    gender: Joi.string().valid("M", "F").required(),
    password: Joi.string().min(8).max(12).required(),
    repeat_password: Joi.ref("password"),
  });

  return signUpSchema.validate(data);
};

export const updateInfoValidate = (data) => {
  const updateInfoSchema = Joi.object({
    first_name: Joi.string().max(50).required(),
    last_name: Joi.string().max(50).required(),
    birthday: Joi.date().required(),
    gender: Joi.string().valid("M", "F").required(),
  });

  return updateInfoSchema.validate(data);
};
