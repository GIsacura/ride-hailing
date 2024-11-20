import boom from "@hapi/boom";

export const validatorSchema = (schema, property) => {
  return (req, res, next) => {
    const data = req[property];
    const { error } = schema.validate(data, { abortEarly: false }); // el abortEarly es para que Joi envie en un mimso mensaje todos los errores en la validacion de una vez
    if (error) {
      next(boom.badRequest(error));
    } else {
      next();
    }
  };
}