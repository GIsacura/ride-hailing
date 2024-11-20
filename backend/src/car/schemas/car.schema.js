import mongoose from "mongoose";

const CarSchema = new mongoose.Schema(
	{
		brand: { type: String, required: true },
		model: { type: String, required: true },
		year: { type: String, required: true },
		status: { type: String, required: true },
		createdBy: {
			type: mongoose.Schema.Types.ObjectId,
			ref: "user",
			required: true,
		},
		updatedBy: {
			type: mongoose.Schema.Types.ObjectId,
			ref: "user",
			required: true,
		},
	},
	{ timestamps: true }
);

export default mongoose.model("car", CarSchema);
