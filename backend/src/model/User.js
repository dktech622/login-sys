import mongoose, { Schema } from "mongoose";

const userSchema = new Schema({
  name: {
    type: String,
    default: "",
  },
  email: {
    type: String,
    unique: true,
    required: true,
  },
  password: {
    type: String,
    required:true
  },
},{ timestamps: true });

export const userModel = mongoose.model("users", userSchema);
