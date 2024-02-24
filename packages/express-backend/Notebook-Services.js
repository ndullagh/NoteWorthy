import notebookModel from "./Notebook.js";
import mongoose from "./db.js";

function findNotebookById(notebook_id)
{
    if (!mongoose.Types.ObjectId.isValid(notebook_id)) {
        return Promise.reject({ statusCode: 400, message: 'Bad Request' });
    }
    return notebookModel.findById(notebook_id);
}

function findNotebookByUserIdAndKey(user_id, key) {
    return notebookModel.find({ user: user_id, name: {$regex: key, $options: 'i' }});
}

function findNotebookByUserId(user_id) {
    return notebookModel.find({ user: user_id});
}

function addNotebook(nb) {
    const nbToAdd = new notebookModel(nb);
    const promise = nbToAdd.save();
    return promise;
}

export default {
    findNotebookById,
    findNotebookByUserIdAndKey,
    findNotebookByUserId,
    addNotebook
}