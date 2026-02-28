import express from "express";
import cors from "cors";
import cookieParser from "cookie-parser";
import helmet from "helmet";
import morgan from "morgan";

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
    origin: process.env.PORT,
    credentials: true,
  }),
);
app.use(cookieParser());

app.use("/health", async (req, res) => {
  res
    .status(200)
    .json({ success: true, message: "Application server is healthy" });
});

export default app;
