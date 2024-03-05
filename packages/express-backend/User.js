import mongoose from "./db.js";

const UserSchema = new mongoose.Schema(
  {
    username: {
      type: String,
      required: true,
      unique: true,
      trim: true
    },
    password: {
      type: String,
      required: true,
      trim: true
      /*validate(value) {
      }, //use to enforce password requirements. passwords must be hashed before being entered. */
    },
    email: {
      type: String,
      required: true,
      unique: true,
      trim: true
    }
  },
  { collection: "nw_users" }
);

const User = mongoose.model("User", UserSchema);

//note: it's in the mongodb database rather than encoded in here (it shouldn't be but i'm tired),
//but users may not have duplicate usernames or emails

export default User;
