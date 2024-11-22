import { AuthService } from "../services/auth.service.js";

export class AuthController {
	static async register(req, res) {
		try {
			const user = await AuthService.register(req.body);
			return res.status(201).json(user);
		} catch (error) {
			return res.status(500).json(error.message);
		}
	}

	static async login(req, res) {
		try {
			const user = await AuthService.login(req.body);

			return res.status(200).json(user);
		} catch (error) {
			return res.status(500).json(error.message);
		}
	}
}
