const schema = Joi.object({
    name: Joi.string().min(2).max(10).required(),
    // COMP1001 SCI2002
    code: Joi.string()
      .regex(/^[a-zA-Z]+[0-9]+$/)
      .required(),
    description: Joi.string(),
  });