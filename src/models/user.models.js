const mongoose = require("mongoose");

const userSchema = new mongoose.Schema(
  {
    firstName: { type: String, required: true },
    lastName: { type: String, required: false },
    email: { type: String, required: true, unique: true },
    pincode: { type: String, required: false },

    age: { type: Number, required: true },
    gender: {
      type: String,
      required: true,
      enum: ["Male", "Female", "Others"],
    },
  },
  {
    versionKey: false,
    timestamps: true,
  }
);

module.exports = mongoose.model("user", userSchema);
