import { Types } from "mongoose";
import carSchema from "../schemas/car.schema.js";

export default class CarService {
	static async addCar(car) {
		const createdBy = new Types.ObjectId(car.createdBy);
		const updatedBy = new Types.ObjectId(car.updatedBy);
		return await carSchema.create({ ...car, createdBy, updatedBy });
	}

	static async getAllCars(queryParams) {
		return await carSchema.aggregate([
			{
				$facet: {
					data: [
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
						{
							$sort: { createdAt: -1 },
						},
						{
							$skip: parseInt(queryParams.offset) || 0,
						},
						{
							$limit: parseInt(queryParams.limit) || 10,
						},
					],
					totalCount: [
						{
							$count: "count",
						},
					],
				},
			},
			{
				$project: {
					data: 1,
					totalCount: { $arrayElemAt: ["$totalCount.count", 0] },
				},
			},
		]);
	}

	static async getCarById(id) {
		const car = await carSchema.aggregate([
			{
				$match: {
					_id: new Types.ObjectId(id),
				},
			},
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

		return await carSchema.findByIdAndUpdate(id, carInfo, { new: true });
	}

	static async deleteCar(id) {
		return await carSchema.findByIdAndDelete(id);
	}
}
