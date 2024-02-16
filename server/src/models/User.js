import { Schema, model } from "mongoose";

// Creating a Mongoose schema for users
const userSchema = new Schema(
  {
    fullName: {
      type: String,
      required: true,
    },
    age: {
      type: Number,
      required: true,
    },
    location: {
      type: String,
      require: true,
    },
    email: {
      type: String,
      required: true,
      unique: true,
    },
    password: {
      type: String,
      required: true,
    },
    refreshTokens: {
      type: [String],
      required: true,
    },
  },
  {
    timestamps: true,
  }
);

// Creating a Mongoose model for users
const User = model("User", userSchema);

export default User;
