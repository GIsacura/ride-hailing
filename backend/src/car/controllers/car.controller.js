import CarService from "../services/car.service.js";

export default class CarController {
	static async addCar(req, res) {
		if (!req.session.user) {
			return res.status(401).json({ message: "Unauthorized" });
		}

		try {
			const car = await CarService.addCar({
				...req.body,
				createdBy: req.session.user.id,
				updatedBy: req.session.user.id,
			});
			res.status(201).json({ car });
		} catch (error) {
			res.status(500).json({ error: error.message });
		}
	}

	static async getAllCars(req, res) {
		if (!req.session.user) {
			return res.status(401).json({ message: "Unauthorized" });
		}

		try {
			const cars = await CarService.getAllCars(req.query);
			return res.status(200).json({ cars });
		} catch (error) {
			res.status(500).json({ error: error.message });
		}
	}

	static async getCarById(req, res) {
		if (!req.session.user) {
			return res.status(401).json({ message: "Unauthorized" });
		}

		try {
			const car = await CarService.getCarById(req.params.id);
			return res.status(200).json({ car });
		} catch (error) {
			res.status(500).json({ error: error.message });
		}
	}

	static async updateCar(req, res) {
		if (!req.session.user) {
			return res.status(401).json({ message: "Unauthenticated" });
		}

		if (req.session.user.role !== "admin") {
			return res
				.status(403)
				.json({ message: "Unauthorized: you have to be admin" });
		}

		try {
			const car = await CarService.updateCar(req.params.id, {
				...req.body,
				updatedBy: req.session.user.id,
			});
			return res.status(200).json({ car });
		} catch (error) {
			res.status(500).json({ error: error.message });
		}
	}
}
