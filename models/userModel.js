import { Schema, model, models } from "mongoose";

const userSchema = new Schema({
  wallet_address: String,
  bio: String,
  x_link: String,
  // user_type: String, // 'creator' or 'buyer'
  products_bought: [{ type: Schema.Types.ObjectId, ref: "Product" }],
  products_listed: [{ type: Schema.Types.ObjectId, ref: "Product" }],
});

const User = models.User || model("User", userSchema);
export default User;
