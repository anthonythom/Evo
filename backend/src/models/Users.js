import mongoose from "mongoose";

const UserSchema = new mongoose.Schema({
  username: String,
  email: String,    
  password: { type: String, required: true },
  savedRecipes: [{ type: mongoose.Schema.Types.ObjectId, ref: "Recipe" }],
});

export const UserModel = mongoose.model("users", UserSchema);