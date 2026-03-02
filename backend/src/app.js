import express from "express";
import cors from "cors";
import cookieParser from "cookie-parser";
import helmet from "helmet";
import morgan from "morgan";
import { errorHandler } from "./middlewares/error.middleware.js";
import authRouter from "./routes/auth.route.js";
import urlRouter from "./routes/url.route.js";

const app = express();

app.use(helmet());

if (process.env.NODE_ENV === "development") {
  app.use(morgan("dev"));
} else {
  app.use(morgan("combined"));
}

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use(
  cors({
    origin: process.env.FRONTEND_ORIGIN,
    credentials: true,
  }),
);
app.use(cookieParser());

app.use("/health", async (req, res) => {
  res
    .status(200)
    .json({ success: true, message: "Application server is healthy" });
});

app.use("/api/v1/auth", authRouter);
app.use("/api/v1/url", urlRouter);

app.use(errorHandler);

export default app;
