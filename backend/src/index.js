import "dotenv/config";
import app from "./app.js";
import connectDatabase from "./config/db.config.js";

const PORT = process.env.PORT || 5000;
const NODE_ENV = process.env.NODE_ENV || "development";

const startServer = async () => {
  try {
    await connectDatabase();
    app.listen(PORT, () => {
      console.log(
        `Application server is running on PORT: ${PORT} in ${NODE_ENV} mode.`,
      );
    });
  } catch (error) {
    console.error("Failed to start Application server:", error.message);
    process.exit(1);
  }
};
startServer();
