import mongoose from "mongoose";

const MessageSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      lowercase: true,
    },
    email: {
      type: String,
      unique: true,
      lowercase: true,
      required: true,
    },
    message: {
      type: String,
      lowercase: true,
    },
    phone: {
      type: String,
    }
  },
  { timestamps: true }
);
export default mongoose.model("Message", MessageSchema);
