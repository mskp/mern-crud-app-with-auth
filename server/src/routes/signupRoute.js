import { Router } from "express";
import signUpController from "../controllers/signupController.js";

const signupRouter = Router();

signupRouter.post("/", signUpController);

export default signupRouter;
