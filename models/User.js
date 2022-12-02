import mongoose from "mongoose";
import { v4 as uuidv4 } from "uuid";


const userSchema = new mongoose.Schema(
  {
    name: {type: String,  required: true},
    email: {type: String, unique: true, required: true},
    password: {type: String, required: true},
    emailToken:{type: String},
    isVerified:{type: Boolean,},
  },
  {
    timestamps: true,
    collection: "users",
  }
);



export default mongoose.model("User", userSchema);
