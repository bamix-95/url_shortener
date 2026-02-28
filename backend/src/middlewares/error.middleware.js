import { ZodError } from "zod";

export const errorHandler = (err, req, res, next) => {
  if (process.env.NODE_ENV === "development") {
    console.error(err.stack);
  }

  let statusCode = err.statusCode || 500;
  let message = err.message || "Internal Server Error";
  let errors = [];

  if (err instanceof ZodError) {
    statusCode = 400;
    message = "Validation failed";
    errors = err.issues.map((issue) => ({
      field: issue.path.length > 0 ? issue.path.join(".") : "root",
      message: issue.message,
    }));
  } else if (err.name === "CastError") {
    statusCode = 400;
    message = `Invalid ${err.path}: ${err.value}`;
  } else if (err.code === 11000) {
    statusCode = 409;
    const field = Object.keys(err.keyValue)[0];
    message = `${field} already exists`;
  } else if (err.name === "JsonWebTokenError") {
    statusCode = 401;
    message = "Invalid token";
  } else if (err.name === "TokenExpiredError") {
    statusCode = 401;
    message = "Token expired";
  }

  res.status(statusCode).json({
    success: false,
    message,
    errors: errors.length > 0 ? errors : undefined,
  });
};
