import { Router } from "express";
import { AuthController } from "../auth/controllers/auth.controller.js";
import { validatorSchema } from "../middlewares/validatorSchema.js";
import { validationCreateUserSchema } from "../user/schemas/validationUserSchemas.js";

const router = Router();

router.post(
	"/register",
	validatorSchema(validationCreateUserSchema, "body"),
	AuthController.register
);
router.post("/login", AuthController.login);

export default router;
