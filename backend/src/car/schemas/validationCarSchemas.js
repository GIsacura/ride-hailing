import Joi from "joi";

export const validationCreateCarSchema = Joi.object({
	brand: Joi.string().required(),
	model: Joi.string().required(),
	year: Joi.string().required(),
	status: Joi.string()
		.valid("available", "in-maintenance", "in-service")
		.required(),
});

export const validationUpdateCarSchema = Joi.object({
	status: Joi.string().valid("available", "in-maintenance", "in-service"),
	updatedBy: Joi.string(),
});
