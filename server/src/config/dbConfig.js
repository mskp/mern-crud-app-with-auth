import { connect } from "mongoose";
import { DATABASE_URI } from "./constants.js";

(async () => {
  try {
    await connect(DATABASE_URI);
    console.log("Connected to database");
  } catch (error) {
    console.error("Database connection failed - ${error.message}");
    process.exit(1);
  }
})();
