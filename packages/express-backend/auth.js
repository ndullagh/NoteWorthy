import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import User from "./User-Services.js";

export function registerUser(req, res) {
  const { username, password, email } = req.body; // from form

  if (!username || !password || !email) {
    res.status(400).send("Bad request: Invalid input data.");
  } else {
    /*else if ((User.findUserByUserName(username))) {
      res.status(409).send("Username already taken");
    } */
    User.findUserByUserName(username)
      .then((result) => {
        if (!(result.length === 0)) {
          res.status(409).send("Username already taken");
        } else {
          bcrypt
            .genSalt(10)
            .then((salt) => bcrypt.hash(password, salt))
            .then((hashedPassword) => {
              generateAccessToken(username).then((token) => {
                console.log("Token:", token);
                res.status(201).send({ token: token });

                User.addUser(
                  JSON.parse(
                    JSON.stringify({
                      username: username,
                      password: hashedPassword,
                      email: email
                    })
                  )
                );
              });
            });
        }
      })
      .catch((error) => {
        console.log(error);
      });
  }
}

function generateAccessToken(username) {
  return new Promise((resolve, reject) => {
    jwt.sign(
      { username: username },
      process.env.TOKEN_SECRET,
      { expiresIn: "1d" },
      (error, token) => {
        if (error) {
          reject(error);
          console.log("token error");
        } else {
          resolve(token);
        }
      }
    );
  });
}

export function authenticateUser(req, res, next) {
  const authHeader = req.headers["authorization"];
  //Getting the 2nd part of the auth header (the token)
  const token = authHeader && authHeader.split(" ")[1];

  if (!token) {
    console.log("No token received");
    res.status(401).end();
  } else {
    jwt.verify(
      token,
      process.env.TOKEN_SECRET,
      (error, decoded) => {
        if (decoded) {
          next();
        } else {
          console.log("JWT error:", error);
          res.status(401).end();
        }
      }
    );
  }
}

export function loginUser(req, res) {
  const { username, password } = req.body; // from form

  User.findUserByUserName(username)
    .then((result) => {
      if (result.length === 0) {
        res.status(401).send("User Not Found");
      } else {
        bcrypt
          .compare(password, result[0].password)
          .then((matched) => {
            if (matched) {
              generateAccessToken(username).then((token) => {
                res.status(200).send({ token: token });
              });
            } else {
              // invalid password
              res.status(401).send("Invalid Password");
            }
          })
          .catch(() => {
            res.status(401).send("Unauthorized");
          });
      }
    })
    .catch((error) => {
      console.log(error);
    });
}
