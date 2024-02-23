import notebookModel from "./Notebook.js";

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
    findNotebookByUserIdAndKey,
    findNotebookByUserId,
    addNotebook
}