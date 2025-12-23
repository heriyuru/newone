import mongoose from "mongoose";

const UserSchema = new mongoose.Schema({
  email: {
    type: String,
    required: true,
    unique: true,
  },
  // We use an Array [String] to store multiple tokens (Phone, Laptop, etc.)
  token: {
    type: [String], 
    default: []
  },
}, { timestamps: true });

// Prevent "OverwriteModelError" in Next.js
export default mongoose.models.User || mongoose.model("User", UserSchema);