// backend.js
import express from "express";
import cors from "cors";
import User from "./User-Services.js";

const app = express();
const port = 8000;
app.use(cors());
app.use(express.json());

//test endpoint
app.get("/users", (req, res) => {
  const username = req.query.username;

  User.findUserByUserName(username)
    .then((result) => {
      const response = result === undefined ? [] : result;
      res.send(response);
    })
    .catch((error) => {
      console.log(error);
    });
});

app.listen(port, () => {
  console.log(
    `Example app listening at http://localhost:${port}`
  );
});
