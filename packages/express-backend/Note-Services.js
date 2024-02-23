import noteModel from "./Note.js";
import notebookModel from "./Notebook.js"

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
    return notebookModel.find({ user: userId })
        .then(notebooks => {
            // Extract notebook IDs
            const notebookIds = notebooks.map(notebook => notebook._id);
            // Find all notes where the notebook field matches one of the notebook IDs
            return noteModel.find({ notebook: { $in: notebookIds } });
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