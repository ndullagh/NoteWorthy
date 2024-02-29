import noteModel from "./Note.js";
import notebookModel from "./Notebook.js";
import userModel from "./User.js";
import mongoose from "./db.js";

function findNoteById(noteId)
{
    if (!mongoose.Types.ObjectId.isValid(noteId)) {
        return Promise.reject({ statusCode: 400, message: 'Bad Request' });
    }
    return noteModel.findById(noteId);
}

function findNotesByNotebookAndKey(notebookId, key) {
    if (!mongoose.Types.ObjectId.isValid(notebookId)) {
        return Promise.reject({ statusCode: 400, message: 'Bad Request' });
    }
    return notebookModel.findById(notebookId)
        .then(notebook => {
            if (!notebook) {
                return Promise.reject({ statusCode: 404, message: 'Resource Not Found' });
            }
            // Notebook found, find notes by notebookId
            return noteModel.find({ 
                $and: 
                [
                    { notebook: notebookId }, // Condition for filtering notes by notebookId
                    {
                        $or: [
                            { title: { $regex: key, $options: 'i' } }, // Case-insensitive regex search for keyword in title
                            { contents: { $regex: key, $options: 'i' } } // Case-insensitive regex search for keyword in contents
                        ]
                    }
                ]
            });
        });
  }

function findNotesByNotebook(notebookId) {
     // Check if the notebookId is valid
     if (!mongoose.Types.ObjectId.isValid(notebookId)) {
        return Promise.reject({ statusCode: 400, message: 'Bad Request' });
    }

    // Find the notebook by ID
    return notebookModel.findById(notebookId)
        .then(notebook => {
            if (!notebook) {
                return Promise.reject({ statusCode: 404, message: 'Resource Not Found' });
            }
            // Notebook found, find notes by notebookId
            return noteModel.find({ notebook: notebookId });
        });
}

function addNote(note) {
    const noteToAdd = new noteModel(note);
    const promise = noteToAdd.save();
    return promise;
}

function findNotesByUser(userId) {
    
    // Check if the user ID is valid
    if (!mongoose.Types.ObjectId.isValid(userId)) {
        return Promise.reject({ statusCode: 400, message: 'Bad Request' });
    }

    // Find the user by ID
    return userModel.findById(userId)
        .then(user => {
            // If user doesn't exist, reject with 404 status code
            if (!user) {
                return Promise.reject({ statusCode: 404, message: 'User Not Found' });
            }
            // Find all notebooks belonging to the user
            return notebookModel.find({ user: userId });
        })
        .then(notebooks => {
            // Extract notebook IDs
            const notebookIds = notebooks.map(notebook => notebook._id);
            // Find all notes where the notebook field matches one of the notebook IDs
            return noteModel.find({ notebook: { $in: notebookIds } });
        })
        .catch(error => {
            // Rethrow the error to propagate it
            throw error;
        });
}

function findNotesByUserAndKey(userId, key) {
    // Find all notebooks belonging to the user
    // Check if the user ID is valid
    if (!mongoose.Types.ObjectId.isValid(userId)) {
        return Promise.reject({ statusCode: 400, message: 'Bad Request' });
    }

    // Find the user by ID
    return userModel.findById(userId)
        .then(user => {
            // If user doesn't exist, reject with 404 status code
            if (!user) {
                return Promise.reject({ statusCode: 404, message: 'User Not Found' });
            }
            // Find all notebooks belonging to the user
            return notebookModel.find({ user: userId });
        })
        .then(notebooks => {
            // Extract notebook IDs
            const notebookIds = notebooks.map(notebook => notebook._id);
            // Find all notes where the notebook field matches one of the notebook IDs
            return noteModel.find({
                $and:
                [
                    { notebook: { $in: notebookIds }},
                    {
                        $or:
                        [
                            { title: { $regex: key, $options: 'i' } }, // Case-insensitive regex search for keyword in title
                            { contents: { $regex: key, $options: 'i' } } // Case-insensitive regex search for keyword in contents
                        ]
                    }
                ]});
        })
        .catch(error => {
            // Rethrow the error to propagate it
            throw error;
        });
}

function noteDelete(id)
{
    if (!mongoose.Types.ObjectId.isValid(id)) {
        return Promise.reject({ statusCode: 400, message: 'Bad Request' });
    }
    return noteModel.findByIdAndDelete(id).then(note => {
        if(!note)
        {
            return Promise.reject({ statusCode: 404, message: 'Resource Not Found' });
        }
        else
        {
            return note;
        }
    });
}

function noteUpdate(id, updates)
{
    if (!mongoose.Types.ObjectId.isValid(id)) {
        return Promise.reject({ statusCode: 400, message: 'Bad Request' });
    }

    // Validate notebook field
    if ('notebook' in updates) {
        if (!mongoose.Types.ObjectId.isValid(updates.notebook)) {
            return Promise.reject({ statusCode: 400, message: 'Bad Request' });
        }
    }

    return noteModel.findByIdAndUpdate(id, updates, { new: true }).then(note => {
        if(!note)
        {
            return Promise.reject({ statusCode: 404, message: 'Resource Not Found' });
        }
        else
        {
            return note;
        }
    })
    .catch((error) => {
        throw(error);
    });
}

export default {
    findNoteById,
    findNotesByNotebookAndKey,
    findNotesByNotebook,
    findNotesByUser,
    findNotesByUserAndKey,
    addNote,
    noteDelete,
    noteUpdate
}