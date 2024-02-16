import { Router } from "express";
import refreshTokenController from "../controllers/refreshTokenController.js";

const refreshTokenRouter = Router();

refreshTokenRouter.post("/", refreshTokenController);

export default refreshTokenRouter;
