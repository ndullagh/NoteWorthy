import mongoose from "mongoose";



const UserSchema = new mongoose.Schema(
  {
    username: {
      type: String,
      required: true,
      trim: true,
    },
    password: {
      type: String,
      required: true,
      trim: true,
      /*validate(value) {
        
      }, //use to enforce password requirements. passwords must be hashed before being entered. */
    },
    email: {
        type: String,
        required: true,
        trim: true,
      },
    notebooks: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Notebook'
      }]
  },
  { collection: "nw_users" }
);

const User = mongoose.model("User", UserSchema);

export default User;