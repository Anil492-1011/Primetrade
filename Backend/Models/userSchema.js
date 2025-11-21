const mongoose = require("mongoose");

const userSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
      trim: true,
    },
    BOD: {
      type: Date,
      required: false,
    },
    image: {
      type: String,
      required: false,
    },
    ContactNumber: {
      type: String,
      required: false,
    },
    email: {
      type: String,
      required: true,
      unique: true,
      lowercase: true,
      trim: true,
    },
    password: {
      type: String,
      required: true,
      minlength: 6,
      select: false,
    },
    role: {
      type: String,
      enum: ["Admin", "Student", "Visitor"],
      default: "Student",
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("User", userSchema);
