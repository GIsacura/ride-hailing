import { Types } from "mongoose";
import carSchema from "../schemas/car.schema.js";

export default class CarService {
	static async addCar(car) {
		const createdBy = new Types.ObjectId(car.createdBy);
		const updatedBy = new Types.ObjectId(car.updatedBy);
		return await carSchema.create({ ...car, createdBy, updatedBy });
	}

	static async getAllCars(queryParams) {
		try {
			const pipeline = [];

			// Filtrado por campos específicos (brand, model, status, year)
			if (queryParams.filterBy && queryParams.filterValue) {
				const filter = {};
				filter[queryParams.filterBy] = {
					$regex: new RegExp(queryParams.filterValue, "i"),
				};
				pipeline.push({ $match: filter });
			}

			// Filtrado por rango de fechas (createdAt, updatedAt)
			if (
				queryParams.filterDateBy &&
				queryParams.filterDateFrom &&
				queryParams.filterDateTo
			) {
				const yearFrom = queryParams.filterDateFrom.split("-")[0];
				const monthFrom = queryParams.filterDateFrom.split("-")[1];
				const dayFrom = queryParams.filterDateFrom.split("-")[2];
				const yearTo = queryParams.filterDateTo.split("-")[0];
				const monthTo = queryParams.filterDateTo.split("-")[1];
				const dayTo = queryParams.filterDateTo.split("-")[2];

				const dateFilter = {};
				dateFilter[queryParams.filterDateBy] = {
					$gte: new Date(yearFrom, monthFrom, dayFrom),
					$lte: new Date(yearTo, monthTo, dayTo),
				};
				pipeline.push({ $match: dateFilter });
			}

			// Obtener información de los usuarios
			pipeline.push(
				{
					$lookup: {
						from: "users",
						localField: "createdBy",
						foreignField: "_id",
						pipeline: [
							{
								$project: {
									password: 0,
								},
							},
						],
						as: "createdBy",
					},
				},
				{
					$lookup: {
						from: "users",
						localField: "updatedBy",
						foreignField: "_id",
						as: "updatedBy",
					},
				}
			);

			// Ordenar por fecha de creación de manera descendente
			pipeline.push({ $sort: { createdAt: -1 } });

			// Paginación
			if (queryParams.limit && queryParams.offset) {
				pipeline.push(
					{ $skip: parseInt(queryParams.offset) },
					{ $limit: parseInt(queryParams.limit) }
				);
			}

			const facetPipeline = [
				{
					$facet: {
						data: pipeline,
						totalCount: [{ $count: "count" }],
					},
				},
				{
					$project: {
						data: 1,
						totalCount: { $arrayElemAt: ["$totalCount.count", 0] },
					},
				},
			];

			return await carSchema.aggregate(facetPipeline);
		} catch (error) {
			console.log({ error });

			throw new Error(error.message);
		}
	}

	static async getCarById(id) {
		const car = await carSchema.aggregate([
			{
				$match: {
					_id: new Types.ObjectId(id),
				},
			},
			// Obteniendo información de los usuarios creador y actualizador
			{
				$lookup: {
					from: "users",
					localField: "createdBy",
					foreignField: "_id",
					pipeline: [
						{
							$project: {
								password: 0,
							},
						},
					],
					as: "createdBy",
				},
			},
			{
				$lookup: {
					from: "users",
					localField: "updatedBy",
					foreignField: "_id",
					as: "updatedBy",
				},
			},
		]);

		return car[0];
	}

	static async updateCar(id, carInfo) {
		const car = await carSchema.findById(id);

		if (!car) {
			throw new Error("Car not found");
		}

		await carSchema.findByIdAndUpdate(id, carInfo, { new: true });
		return await this.getCarById(id);
	}

	static async deleteCar(id) {
		return await carSchema.findByIdAndDelete(id);
	}
}
