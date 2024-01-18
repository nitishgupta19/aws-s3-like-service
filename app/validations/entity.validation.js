import Joi from 'joi';

/* Validating signup and login fields */

export default function createAuthenticationSchema(req, res, next) {
  const signupSchema = {
    name: Joi.string().required().min(3).max(50).messages({
      'string.empty': 'First Name can not be empty',
      'string.min': 'First Name contains min 3 charactor',
      'string.max': 'First Name contains max 20 charactor',
    }),
    email: Joi.string().email().required().messages({
      'string.empty': 'Email can not be empty',
      'string.email': 'Email should be valid',
    }),
    password: Joi.string().required().messages({
      'string.empty': 'Password can not be empty',
    }),
  };

  const loginSchema = {
    email: Joi.string().email().required().messages({
      'string.empty': 'Email can not be empty',
      'string.email': 'Email should be valid',
    }),
    password: Joi.string().required().messages({
      'string.empty': 'Password can not be empty',
    }),
  };

  const schema = Joi.object(req.url === '/login' ? loginSchema : signupSchema);

  const options = {
    abortEarly: false,
    allowUnknown: true,
    stripUnknown: true,
  };

  const { error, value } = schema.validate(req.body, options);

  if (error) {
    res.json({
      success: 0,
      message: error.details[0].message,
    });
    // throw Error(error.details[0].message.replace(/['"]+/g, ''));
  } else {
    req.body = value;
    next();
  }
}
