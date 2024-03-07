import mongoose from "mongoose";
import dotenv from "dotenv";

//dotenv stuff for everything else to use, import from here instead of from mongoose
dotenv.config();
mongoose.set("debug", true);

mongoose
  .connect(process.env.MONGODB_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    dbName: "noteworthy"
  })
  .catch((error) => console.log(error));

export default mongoose;
