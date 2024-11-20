import express from "express";
import carRouter from "./car.route.js";
import authRouter from "./auth.route.js";
import userRouter from "./user.route.js";
import { errorHandler } from "../middlewares/errorHandler.js";
import { verifyJwt } from "../middlewares/verifyJwt.js";

const app = express();

app.use("/auth", authRouter);
app.use(verifyJwt);
app.use("/cars", carRouter);
app.use("/users", userRouter);
app.use(errorHandler);

export default app;
