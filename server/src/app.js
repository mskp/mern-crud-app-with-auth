import express from "express";
import cors from "cors";
import cookieParser from "cookie-parser";

// Other dependencies
import { CORS_OPTIONS } from "./config/constants.js";
import "./config/dbConfig.js";

// Routers
import signupRouter from "./routes/signupRoute.js";
import loginRouter from "./routes/loginRoute.js";
import refreshTokenRouter from "./routes/refreshTokenRoute.js";
import userInfoRouter from "./routes/userInfoRoute.js";
import logoutRouter from "./routes/logoutRouter.js";

const app = express();

app.use(express.json());
app.use(cookieParser());
app.use(cors(CORS_OPTIONS));

app.use("/api/signup", signupRouter);
app.use("/api/login", loginRouter);
app.use("/api/logout", logoutRouter);
app.use("/api/refresh-token", refreshTokenRouter);
app.use("/api/user-info", userInfoRouter);

export default app;
