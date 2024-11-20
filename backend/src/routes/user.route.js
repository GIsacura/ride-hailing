import { Router } from "express";
import { validatorSchema } from "../middlewares/validatorSchema.js";
import { validationUpdateUserSchema } from "../user/schemas/validationUserSchemas.js";
import UserController from "../user/controllers/user.controller.js";

const router = Router();

router.patch(
	"/:id",
	validatorSchema(validationUpdateUserSchema, "body"),
	UserController.updateUser
);

export default router;
