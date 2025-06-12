import mongoose from "mongoose";

const userSchema = new mongoose.Schema(
  {
    email: {
      type: String,
      require: true,
      unique: true,
    },
    password: {
      type: String,
      minlength: 8,
      required: true,
    },
    fullName: {
      type: String,
      minlength: 4,
      require: true,
    },
    profilepic: {
      type: String,
    },
  },
  {
    timestamps: true,
  }
);

const User = mongoose.model("User", userSchema);
export default User;
