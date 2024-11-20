import { Router } from "express";
import CarController from "../car/controllers/car.controller.js";
import {
	validationCreateCarSchema,
	validationUpdateCarSchema,
} from "../car/schemas/validationCarSchemas.js";
import { validatorSchema } from "../middlewares/validatorSchema.js";

const router = Router();

router.get("/", CarController.getAllCars);
router.get("/:id", CarController.getCarById);
router.post(
	"/",
	validatorSchema(validationCreateCarSchema, "body"),
	CarController.addCar
);
router.patch(
	"/:id",
	validatorSchema(validationUpdateCarSchema, "body"),
	CarController.updateCar
);
// router.delete("/:id", CarController.deleteCar);

export default router;
