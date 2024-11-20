import Joi from "joi";

export const validationCreateUserSchema = Joi.object({
	name: Joi.string().required(),
	email: Joi.string().email().required(),
	password: Joi.string().required(),
	role: Joi.string().valid("user", "admin").required(),
});

export const validationUpdateUserSchema = Joi.object({
	name: Joi.string(),
	email: Joi.string().email(),
	password: Joi.string(),
	role: Joi.string().valid("user", "admin"),
	updatedBy: Joi.string(),
});
