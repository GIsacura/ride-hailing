import userService from "../../user/services/user.service.js";
import jwt from "jsonwebtoken";
import bcrypt from "bcrypt";

const jwtSecret = process.env.JWT_SECRET;

export class AuthService {
	static async register(userInfo) {
		const user = await userService.getUserByEmail(userInfo.email);

		if (user) {
			throw new Error("User already exists");
		}

		if (!jwtSecret) {
			throw new Error("JWT_SECRET not found");
		}

		try {
			const hashedPassword = await bcrypt.hash(userInfo.password, 10);
			const response = await userService.createUser({
				...userInfo,
				password: hashedPassword,
			});

			delete response._doc.password;

			const jwtPayload = {
				id: response._doc._id,
				username: response._doc.email,
				role: response._doc.role,
			};

			return {
				...response._doc,
				jwt: jwt.sign(jwtPayload, jwtSecret, { expiresIn: "1h" }),
			};
		} catch (error) {
			console.log(error);
		}
	}

	static async login(userInfo) {
		const { email, password } = userInfo;

		if (!jwtSecret) {
			throw new Error("JWT_SECRET not found");
		}
		try {
			const user = await userService.getUserByEmail(email);

			if (!user) {
				throw new Error("Invalid username or password");
			}

			const isMatch = await bcrypt.compare(password, user._doc.password);

			if (!isMatch) {
				throw new Error("Invalid username or password");
			}

			delete user._doc.password;

			const jwtPayload = {
				id: user._doc._id,
				username: user._doc.email,
				role: user._doc.role,
			};
			return {
				...user._doc,
				jwt: jwt.sign(jwtPayload, jwtSecret, { expiresIn: "1h" }),
			};
		} catch (error) {
			throw new Error(error.message);
		}
	}

	static async isValidToken(token) {
		if (!jwtSecret) {
			throw new Error("JWT_SECRET not found");
		}

		try {
			const data = jwt.verify(token, jwtSecret);
			if (!data) {
				return false;
			}
			return true;
		} catch (error) {
			console.log({ error });

			return false;
		}
	}
}
