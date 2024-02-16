import { Router } from "express";
import logoutController from "../controllers/logoutController.js";
import verifyAccessToken from "../middlewares/verifyAccessToken.js";

const logoutRouter = Router();

logoutRouter.delete("/", verifyAccessToken, logoutController);

export default logoutRouter