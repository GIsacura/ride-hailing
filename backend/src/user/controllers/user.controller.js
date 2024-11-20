import UserService from "../services/user.service.js";

export default class UserController {
	static async updateUser(req, res) {
		if (!req.session.user) {
			return res.status(401).json({ message: "Unauthenticated" });
		}

		if (req.session.user.role !== "admin") {
			return res
				.status(403)
				.json({ message: "Unauthorized: you have to be admin" });
		}

		try {
			const userUpdated = await UserService.updateUser(req.params.id, {
				...req.body,
				updatedBy: req.session.user.id,
			});
			return res.status(200).json({ userUpdated });
		} catch (error) {
			res.status(500).json({ error: error.message });
		}
	}
}
