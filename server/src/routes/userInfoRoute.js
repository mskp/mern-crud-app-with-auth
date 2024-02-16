import { Router } from "express";
import {
  deleteUserInfoController,
  getUserInfoController,
  updateUserInfoController,
} from "../controllers/userInfoController.js";
import verifyToken from "../middlewares/verifyAccessToken.js";

const userInfoRouter = Router();

userInfoRouter
  .route("/")
  .all(verifyToken)
  .get(getUserInfoController)
  .put(updateUserInfoController)
  .delete(deleteUserInfoController);

export default userInfoRouter;
