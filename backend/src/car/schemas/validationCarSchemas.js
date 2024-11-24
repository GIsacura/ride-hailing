import Joi from "joi";

export const validationCreateCarSchema = Joi.object({
	brand: Joi.string()
		.regex(/^[A-Za-z]+$/)
		.required(),
	model: Joi.string()
		.regex(/^[A-Za-z0-9 ]+$/)
		.required(),
	year: Joi.string()
		.regex(/^[0-9]+$/)
		.required(),
	status: Joi.string()
		.valid("available", "in-maintenance", "in-service")
		.required(),
});

export const validationUpdateCarSchema = Joi.object({
	brand: Joi.string().regex(/^[A-Za-z]+$/),
	model: Joi.string().regex(/^[A-Za-z0-9 ]+$/),
	year: Joi.string().regex(/^[0-9]+$/),
	status: Joi.string().valid("available", "in-maintenance", "in-service"),
	updatedBy: Joi.string(),
});
