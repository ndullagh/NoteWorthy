// backend.js
import express from "express";
import cors from "cors";
import User from "./User-Services.js"



const app = express();
const port = 8000;
app.use(cors());
app.use(express.json());

//user endpoints
//test endpoint
app.get("/users?username=<name>", (req, res) => {
    const username = req.query.username;
   
    User.findUserByUserName(username).then((result) => {
        const response = result === undefined ? []:result;
        res.send(response);
    })
    .catch((error) => {
        console.log(error);
    });
    
  });

app.post("/users", (req, res) => {
    const userToAdd = req.body;

    User.addUser(userToAdd).then((addedUser) => {
        res.status(201).send(addedUser); // 201 status code for successful resource creation
      })
      .catch((error) => {
        /*console.log(error);*/
        if (error.code === 11000 && error.keyPattern && error.keyValue) {
            // Duplicate key error occurred
            const field = Object.keys(error.keyPattern)[0];
            const value = error.keyValue[field];
            res.status(400).json({ message: `Duplicate key error: ${field} '${value}' already exists.` });
        } else if (error.errors) {
            // Mongoose validation error occurred
            const validationErrors = Object.keys(error.errors).map((key) => {
                return {
                    field: key,
                    message: error.errors[key].message
                };
            });
            res.status(400).json({ errors: validationErrors });
        } else {
            // Other error occurred
            console.log(error);
            res.status(500).send('Internal Server Error');
        }
      });
});

//Notebook endpoints

//Note endpoints

app.listen(port, () => {
  console.log(
    `Example app listening at http://localhost:${port}`
  );
});