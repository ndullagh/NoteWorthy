// backend.js
import express from "express";
import cors from "cors";
import User from "./User-Services.js";
import Notebook from "./Notebook-Services.js";
import Note from "./Note-Services.js";



const app = express();
const port = 8000;
app.use(cors());
app.use(express.json());
app.use((error, req, res, next) => {
    console.error(error); // Log the error
    res.status(400).send('Bad Request'); // Send an error response
});

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
        console.log(error);
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

app.get("/notebooks/:user_id", (req, res) => {
    const user_id = req.params.user_id;
    const key = req.query.key;
    if(key != undefined)
    {
        Notebook.findNotebookByUserIdAndKey(user_id, key).then((result) => {
            const response = result === undefined ? []:result;
            res.send(response);
        })
        .catch((error) => {
            console.log(error);
            if (error.code === '400') {
                res.status(400).send('Bad request'); // Handle 400 error
            } else {
                res.status(500).send('Internal server error'); // Handle other errors
            }
        });
    }
    else
    {
        Notebook.findNotebookByUserId(user_id).then((result) => {
            const response = result === undefined ? []:result;
            res.send(response);
        })
        .catch((error) => {
            console.log(error);
            if (error.code === '400') {
                res.status(400).send('Bad request'); // Handle 400 error
            } else {
                res.status(500).send('Internal server error'); // Handle other errors
            }
        });
    }
    
    
});

app.post("/notebooks", (req, res) => {
    const notebookToAdd = req.body;

    Notebook.addNotebook(notebookToAdd).then((addedNotebook) => {
        res.status(201).send(addedNotebook); // 201 status code for successful resource creation
      })
      .catch((error) => {
        /*console.log(error);*/
        if (error.errors) { // check on these errors
            // Mongoose validation error occurred
            const validationErrors = Object.keys(error.errors).map((key) => {
                res.status(400).send(error.errors[key].message)
                return {
                    field: key,
                    message: error.errors[key].message
                };
            });
            res.status(400).json({ errors: validationErrors });
        } else if (error.message === 'User does not exist') {
            res.status(404).json({ message: 'User does not exist' });

        } else {
            // Other error occurred
            console.log(error);
        }
        console.log(error);
      });
});

//Note endpoints
/*app.get("/notes/by_user/:user_id", (req, res) => {
    const user_id = req.params.user_id;
    const key = req.query.key;
    
    if(key != undefined)
    {
        Note.findNotesByUserAndKey(user_id, key).then((result) => {
            const response = result === undefined ? []:result;
            res.send(response);
        })
        .catch((error) => {
            console.log(error);
            if (error.code === '400') {
                res.status(400).send('Bad request'); // Handle 400 error
            } else {
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
            console.log(error);
            if (error.code === '400') {
                res.status(400).send('Bad request'); // Handle 400 error
            } else {
                res.status(500).send('Internal server error'); // Handle other errors
            }
        });
    }
    
    
});*/

//pieced together from the internet, not sure how the async/await stuff works yet
app.get("/notes/by_user/:user_id", async (req, res) => {
    const user_id = req.params.user_id;
    const key = req.query.key;
    
    try {
        let result;
        if (key !== undefined) {
            result = await Note.findNotesByUserAndKey(user_id, key);
        } else {
            result = await Note.findNotesByUser(user_id);
        }
        res.send(result || []); // Send result or empty array if result is undefined
    } catch (error) {
        console.error(error);
            if (error.statusCode === 400) {
                res.status(400).send('Bad request.'); // Handle 400 error
            } 
            else if(error.statusCode === 404) {
                res.status(404).send('Resource Not Found.'); // Handle 400 error
            } 
            else {
                res.status(500).send('Internal server error'); // Handle other errors
            }
    }
});

app.get("/notes/by_notebook/:notebook_id", (req, res) => {
    const notebook_id = req.params.notebook_id;
    const key = req.query.key;
    
    if(key != undefined)
    {
        Note.findNotesByNotebookAndKey(notebook_id, key).then((result) => {
            const response = result === undefined ? []:result;
            res.send(response);
        })
        .catch((error) => {
            console.error(error);
            if (error.statusCode === 400) {
                res.status(400).send('Bad request.'); // Handle 400 error
            } else {
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
                res.status(400).send('Bad request.'); // Handle 400 error
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
    
    
});


app.post("/notes", (req, res) => {
    const noteToAdd = req.body;

    Note.addNote(noteToAdd).then((addedNote) => {
        res.status(201).send(addedNote); // 201 status code for successful resource creation
      })
      .catch((error) => { //check on these errors
        /*console.log(error);*/
        if (error.errors) { // check on these errors
            // Mongoose validation error occurred
            const validationErrors = Object.keys(error.errors).map((key) => {
                res.status(400).send(error.errors[key].message)
                return {
                    field: key,
                    message: error.errors[key].message
                };
            });
            res.status(400).json({ errors: validationErrors });
        } else if (error.message === 'Notebook does not exist') {
            res.status(404).json({ message: 'Notebook does not exist' });

        } else {
            // Other error occurred
            console.log(error);
        }
        console.log(error);
      });
});



app.listen(port, () => {
  console.log(
    `Example app listening at http://localhost:${port}`
  );
});