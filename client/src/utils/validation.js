import Joi from "joi";

export const signUpValidate = (data) => {
  const signUpSchema = Joi.object({
    email: Joi.string()
      .email({ tlds: { allow: false } })
      .required(),
    password: Joi.string().required(),
    repeat_password: Joi.ref("password"),
  });

  return signUpSchema.validate(data);
};
