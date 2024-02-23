import noteModel from "./Note.js";
import notebookModel from "./Notebook.js"
import mongoose from "./db.js"

function findNotesByNotebookAndKey(notebook_id, key) {
    return noteModel.find({ 
        $and: 
        [
            { notebook: notebook_id }, // Condition for filtering notes by notebookId
            {
                $or: [
                    { title: { $regex: key, $options: 'i' } }, // Case-insensitive regex search for keyword in title
                    { contents: { $regex: key, $options: 'i' } } // Case-insensitive regex search for keyword in contents
                ]
            }
        ]
    });
  }

function findNotesByNotebook(notebookId) {
    // Find all notebooks belonging to the user
    return noteModel.find({notebook: notebookId});
}

function addNote(note) {
    const noteToAdd = new noteModel(note);
    const promise = noteToAdd.save();
    return promise;
}

function findNotesByUser(userId) {
    // Find all notebooks belonging to the user
    if (!mongoose.Types.ObjectId.isValid(userId)) {
        const customError = new Error('Bad request.');
        customError.code = '400';
        throw customError;
        
    }

    return notebookModel.find({ user: userId })
        .then(notebooks => {
            // Extract notebook IDs
            if (notebooks.length === 0) {
                // If no notebooks are found, return an empty array of notes
                return [];
            }
            const notebookIds = notebooks.map(notebook => notebook._id);
            // Find all notes where the notebook field matches one of the notebook IDs
            return noteModel.find({ notebook: { $in: notebookIds } });
        })
        .catch(error => {
            // Handle any errors that occur during the query
            console.error('Error finding notes by user:', error);
            // Rethrow the error to propagate it
            throw error;
        });
}

function findNotesByUserAndKey(userId, key) {
    // Find all notebooks belonging to the user
    return notebookModel.find({ user: userId })
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
                ]
        });
    });
}

export default {
    findNotesByNotebookAndKey,
    findNotesByNotebook,
    findNotesByUser,
    findNotesByUserAndKey,
    addNote
}