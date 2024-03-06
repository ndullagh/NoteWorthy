// backend.js
import express from "express";
import cors from "cors";
import User from "./User-Services.js";
import Notebook from "./Notebook-Services.js";
import Note from "./Note-Services.js";
import { registerUser , authenticateUser, loginUser} from "./auth.js";


const app = express();
const port = 8000;
app.use(cors());
app.use(express.json());

//user endpoints
//get user by username or id
app.get("/users",authenticateUser, (req, res) => {
    const username = req.query.username;
    const _id = req.query._id;

    if(username != undefined)
    {
        User.findUserByUserName(username).then((result) => {
            if(result.length === 0)
            {
                res.status(404).send('Resource Not Found.');
            }
            else{
                res.status(200).send(result);
            }
        })
        .catch((error) => {
            console.log(error);
        });
    }
    else if (_id != undefined)
    {
        User.findUserById(_id).then((result => {
            if(!result)
            {
                res.status(404).send('Resource Not Found.');
            }
            else
            {
                res.status(200).send(result);
            }
        }))
        .catch((error) => {
            console.log(error);
            console.log("Error status code:", error.statusCode);
            if (error.statusCode === 400) {
                res.status(400).send('Bad Request'); // Handle 400 error
            } else {
                res.status(500).send('Internal Server Error'); // Handle other errors
            }
        });

    }
    else
    {
        //res.status(400).send('Bad Request'); // Handle 400 error
        User.findAll().then((result) => {
            res.status(200).send(result);
            
        })
        .catch((error) => {
            console.log(error);
        });
    }
    
    
    
  });


//theoretically use registeruser from auth.js
app.post("/signup", registerUser);

app.post("/login", loginUser);

//post new user
//usernames and emails MUST be unique
app.post("/users",authenticateUser, (req, res) => {
    const userToAdd = req.body;

  User.addUser(userToAdd)
    .then((addedUser) => {
      res.status(201).send(addedUser); // 201 status code for successful resource creation
    })
    .catch((error) => {
      console.log(error);
      if (
        error.code === 11000 &&
        error.keyPattern &&
        error.keyValue
      ) {
        // Duplicate key error occurred
        const field = Object.keys(error.keyPattern)[0];
        const value = error.keyValue[field];
        res.status(400).json({
          message: `Duplicate key error: ${field} '${value}' already exists.`
        });
      } else if (error.errors) {
        // Mongoose validation error occurred
        const validationErrors = Object.keys(error.errors).map(
          (key) => {
            return {
              field: key,
              message: error.errors[key].message
            };
          }
        );
        res.status(400).json({ errors: validationErrors });
      } else {
        // Other error occurred
        console.log(error);
        res.status(500).send("Internal Server Error");
      }
    });
});

//delete user by id
app.delete("/users/:_id",authenticateUser, (req, res) => {
    const _id = req.params["_id"];
    User.userDelete(_id).then((response) => {
      res.status(204).send(response);
    })
    .catch((error) => {
      console.log(error);
      if (error.statusCode === 400) {
        res.status(400).send("Bad Request");
      } else if (error.statusCode === 404) {
        res.status(404).send("Resource Not Found");
      } else {
        //console.log("AAA");
        res.status(500).send("Internal Server Error");
      }
    });
});

// PATCH endpoint to update a notebook by ID
app.patch("/users/:_id",authenticateUser, (req, res) => {
    const  _id  = req.params["_id"];
    const updates = req.body;

  //NOT allowed to change _id
  if ("_id" in updates) {
    delete updates._id;
  }

  User.userUpdate(_id, updates)
    .then((response) => {
      res.status(200).send(response);
    })
    .catch((error) => {
      console.log(error);
      if (error.statusCode === 400) {
        res.status(400).send("Bad Request");
      } else if (error.statusCode === 404) {
        res.status(404).send("Resource Not Found");
      } else {
        res.status(500).send("Internal Server Error");
      }
    });
});

//Notebook endpoints

//get notebooks by owner user_id or by notebook's _id. if searching by user_id, may also include keyword
//may NOT search by key if searching by _id, will result in 400 error
app.get("/notebooks",authenticateUser, (req, res) => {
    const user_id = req.query.user_id;
    const key = req.query.key;
    const _id = req.query._id;

  if (_id != undefined) {
    if (key != undefined) {
      res.status(400).send("Bad Request");
    } else {
      Notebook.findNotebookById(_id)
        .then((result) => {
          if (!result) {
            res.status(404).send("Resource Not Found.");
          } else {
            res.status(200).send(result);
          }
        })
        .catch((error) => {
          console.log(error);
          console.log("Error status code:", error.statusCode);
          if (error.statusCode === 400) {
            res.status(400).send("Bad Request"); // Handle 400 error
          } else {
            res.status(500).send("Internal Server Error"); // Handle other errors
          }
        });
    }
  } else if (user_id != undefined) {
    if (key != undefined) {
      Notebook.findNotebookByUserIdAndKey(user_id, key)
        .then((result) => {
          const response = result === undefined ? [] : result;
          res.status(200).send(response);
        })
        .catch((error) => {
          console.log(error);
          if (error.statusCode === 400) {
            res.status(400).send("Bad Request"); // Handle 400 error
          } else if (error.statusCode === 404) {
            res.status(404).send("Resource Not Found");
          } else {
            res.status(500).send("Internal server error"); // Handle other errors
          }
        });
    } else {
      Notebook.findNotebookByUserId(user_id)
        .then((result) => {
          const response = result === undefined ? [] : result;
          res.send(response);
        })
        .catch((error) => {
          console.log(error);
          if (error.statusCode === 400) {
            res.status(400).send("Bad Request"); // Handle 400 error
          } else {
            res.status(500).send("Internal server error"); // Handle other errors
          }
        });
    }
  } else {
    res.status(400).send("Bad Request");
  }
});

//post new notebook
//user owner's user_id MUST exist in the user collection
app.post("/notebooks",authenticateUser, (req, res) => {
    const notebookToAdd = req.body;

  Notebook.addNotebook(notebookToAdd)
    .then((addedNotebook) => {
      res.status(201).send(addedNotebook); // 201 status code for successful resource creation
    })
    .catch((error) => {
      /*console.log(error);*/
      if (error.errors) {
        // check on these errors
        // Mongoose validation error occurred
        const validationErrors = Object.keys(error.errors).map(
          (key) => {
            //res.status(400).send(error.errors[key].message)
            return {
              field: key,
              message: error.errors[key].message
            };
          }
        );
        res.status(400).json({ errors: validationErrors });
      } else if (error.message === "User does not exist") {
        res
          .status(404)
          .json({ message: "User does not exist" });
      } else {
        // Other error occurred
        console.log(error);
      }
      console.log(error);
    });
});

//delete notebook by id
app.delete("/notebooks/:_id",authenticateUser, (req, res) => {
    const _id = req.params["_id"];
    Notebook.notebookDelete(_id).then((response) => {
      res.status(204).send(response);
    })
    .catch((error) => {
      console.log(error);
      if (error.statusCode === 400) {
        res.status(400).send("Bad Request");
      } else if (error.statusCode === 404) {
        res.status(404).send("Resource Not Found");
      } else {
        res.status(500).send("Internal Server Error");
      }
    });
});

// PATCH endpoint to update a notebook by ID
app.patch("/notebooks/:_id",authenticateUser, (req, res) => {
    const  _id  = req.params["_id"];
    const updates = req.body;

  //NOT allowed to change _id
  if ("_id" in updates) {
    delete updates._id;
  }

  Notebook.notebookUpdate(_id, updates)
    .then((response) => {
      res.status(200).send(response);
    })
    .catch((error) => {
      console.log(error);
      if (error.statusCode === 400) {
        res.status(400).send("Bad Request");
      } else if (error.statusCode === 404) {
        res.status(404).send("Resource Not Found");
      } else {
        res.status(500).send("Internal Server Error");
      }
    });
});

//Note endpoints
//get notes by user, notebook, or _id
//if searching by user or notebook, may include key (searches title and contents for key)
//may NOT include key if searching by _id - will result in 400 error
app.get("/notes",authenticateUser, (req, res) => {
    const user_id = req.query.user_id;
    const notebook_id = req.query.notebook_id;
    const key = req.query.key;
    const _id = req.query._id;
    if(_id != undefined)
    {
        if(key === undefined)
        {
            Note.findNoteById(_id).then((result) => {
                if(!result)
                {
                    res.status(404).send('Resource Not Found')
                }
                else
                {
                    res.status(200).send(result);
                }
                
            })
            .catch((error) => {
                console.error(error);
                if (error.statusCode === 400) {
                    res.status(400).send('Bad Request'); // Handle 400 error
                } 
                else if (error.statusCode === 404)
                {
                    res.status(404).send('Resource Not Found.'); // Handle 400 error
                }
                else {
                    res.status(500).send('Internal server error'); // Handle other errors
                }
            });
        }
        else
        {
            res.status(400).send('Bad Request');
        }
        
    }
    else if(notebook_id != undefined)
    {
        if(key != undefined)
        {
            Note.findNotesByNotebookAndKey(notebook_id, key).then((result) => {
                const response = result === undefined ? []:result;
                res.send(response);
            })
            .catch((error) => {
                console.error(error);
                if (error.statusCode === 400) {
                    res.status(400).send('Bad Request'); // Handle 400 error
                }
                else if (error.statusCode === 404)
                {
                    res.status(404).send('Resource Not Found.'); // Handle 400 error
                } 
                else {
                    res.status(500).send('Internal server error'); // Handle other errors
                }
            });
        }
        else
        {
            Note.findNotesByNotebook(notebook_id).then((result) => {
                const response = result === undefined ? []:result;
                res.send(response);
            })
            .catch((error) => {
                console.error(error);
                if (error.statusCode === 400) {
                    res.status(400).send('Bad Request'); // Handle 400 error
                } 
                else if (error.statusCode === 404)
                {
                    res.status(404).send('Resource Not Found.'); // Handle 400 error
                }
                else {
                    res.status(500).send('Internal server error'); // Handle other errors
                }
            });
        }
    }
    
    else if(user_id != undefined)
    {
        if(key != undefined)
        {
            Note.findNotesByUserAndKey(user_id, key).then((result) => {
                const response = result === undefined ? []:result;
                res.send(response);
            })
            .catch((error) => {
                console.error(error);
                if (error.statusCode === 400) {
                    res.status(400).send('Bad Request'); // Handle 400 error
                } 
                else if (error.statusCode === 404) {
                    res.status(404).send('Resource Not Found'); // Handle 400 error
                } 
                else {
                    res.status(500).send('Internal server error'); // Handle other errors
                }
            });
        }
        else
        {
            Note.findNotesByUser(user_id).then((result) => {
                const response = result === undefined ? []:result;
                res.send(response);
            })
            .catch((error) => {
                console.error(error);
                if (error.statusCode === 400) {
                    res.status(400).send('Bad Request'); // Handle 400 error
                } 
                else if (error.statusCode === 404)
                {
                    res.status(404).send('Resource Not Found.'); // Handle 400 error
                }
                else {
                    res.status(500).send('Internal server error'); // Handle other errors
                }
            });
        }
    }
    else
    {
        res.status(400).send('Bad Request');
    }
    
});




//post new note, notebook containing it must exist
app.post("/notes",authenticateUser, (req, res) => {
    const noteToAdd = req.body;

  Note.addNote(noteToAdd)
    .then((addedNote) => {
      res.status(201).send(addedNote); // 201 status code for successful resource creation
    })
    .catch((error) => {
      //check on these errors
      /*console.log(error);*/
      if (error.errors) {
        // check on these errors
        // Mongoose validation error occurred
        const validationErrors = Object.keys(error.errors).map(
          (key) => {
            //res.status(400).send(error.errors[key].message)
            return {
              field: key,
              message: error.errors[key].message
            };
          }
        );
        res.status(400).json({ errors: validationErrors });
      } else if (error.message === "Notebook does not exist") {
        res
          .status(404)
          .json({ message: "Notebook does not exist" });
      } else {
        // Other error occurred
        console.log(error);
      }
      console.log(error);
    });
});

//delete note by _id
app.delete("/notes/:_id",authenticateUser, (req, res) => {
    const _id = req.params["_id"];
    Note.noteDelete(_id).then((response) => {
      res.status(204).send(response);
    })
    .catch((error) => {
      console.log(error);
      if (error.statusCode === 400) {
        res.status(400).send("Bad Request");
      } else if (error.statusCode === 404) {
        res.status(404).send("Resource Not Found");
      } else {
        res.status(500).send("Internal Server Error");
      }
    });
});

// PATCH endpoint to update a note by ID
app.patch("/notes/:_id",authenticateUser, (req, res) => {
    const  _id  = req.params["_id"];
    const updates = req.body;

  //NOT allowed to change _id
  if ("_id" in updates) {
    delete updates._id;
  }

  Note.noteUpdate(_id, updates)
    .then((response) => {
      res.status(200).send(response);
    })
    .catch((error) => {
      console.log(error);
      if (error.statusCode === 400) {
        res.status(400).send("Bad Request");
      } else if (error.statusCode === 404) {
        res.status(404).send("Resource Not Found");
      } else {
        res.status(500).send("Internal Server Error");
      }
    });
});

app.listen(port, () => {
  console.log(
    `Example app listening at http://localhost:${port}`
  );
});
