import { Schema, model, models } from "mongoose";

const userSchema = new Schema({
  wallet_address: String,
  bio: String,
  x_link: String,
});

const User = models.User || model("User", userSchema);
export default User;
