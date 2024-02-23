import userModel from "./User.js";
import mongoose from "mongoose";
import dotenv from "dotenv";

//dotenv stuff should prob be in a separate file but it wasn't working so I stuck it here for now
dotenv.config();
mongoose.set("debug", true);

mongoose
  .connect(process.env.MONGODB_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    dbName: "noteworthy"
  })
  .catch((error) => console.log(error));

function findUserByUserName(name) {
  return userModel.find({ username: name });
}

export default {
  findUserByUserName
};
