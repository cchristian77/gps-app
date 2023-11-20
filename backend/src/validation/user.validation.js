import Joi from "joi";

const storeUserValidation = Joi.object({
  username: Joi.string().min(6).required(),
  email: Joi.string().email().min(10).required(),
  password: Joi.string().min(6).required(),
  full_name: Joi.string().max(255).required(),
  role:  Joi.string().valid('USER', 'ADMINISTRATOR').required(),
})

const authValidation = Joi.object({
  username: Joi.string().required(),
  password: Joi.string().required(),
})

export {
  storeUserValidation,
  authValidation
}

