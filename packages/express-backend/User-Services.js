import userModel from "./User.js";
import notebookModel from "./Notebook.js";
import Notebook from "./Notebook-Services.js"
import mongoose from "./db.js";

function findUserById(user_id)
{
    if (!mongoose.Types.ObjectId.isValid(user_id)) {
        return Promise.reject({ statusCode: 400, message: 'Bad Request' });
    }
    return userModel.findById(user_id);
}

function findUserByUserName(name) {
    return userModel.find({ username: name });
}

function addUser(user) {
    const userToAdd = new userModel(user);
    const promise = userToAdd.save();
    return promise;
}

function userDelete(id) {
    if (!mongoose.Types.ObjectId.isValid(id)) {
        return Promise.reject({ statusCode: 400, message: 'Bad Request' });
    }

    // Find the user
    return userModel.findById(id).then(result => {
        if (!result) {
            console.log("Hello");
            return Promise.reject({ statusCode: 404, message: 'Resource Not Found' });
        } else {
            // Find all notebooks owned by the user
            return notebookModel.find({ user: id }).then(notebooks => {
                // Delete all notes associated with each notebook
                const deleteNotebooksPromises = notebooks.map(notebook => {
                    return Notebook.notebookDelete(notebook._id); // Utilize notebookDelete function
                });

                // After deleting notebooks and their associated notes, delete the user
                return Promise.all(deleteNotebooksPromises).then(() => {
                    return userModel.findByIdAndDelete(id).then(user => {
                        if (!user) {
                            return Promise.reject({ statusCode: 404, message: 'Resource Not Found' });
                        } else {
                            return user;
                        }
                    });
                });
            });
        }
    });
}

export default {
    findUserById,
    findUserByUserName,
    addUser,
    userDelete
}