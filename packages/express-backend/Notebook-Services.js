import notebookModel from "./Notebook.js";

function findNotebookByUserIdAndName(user_id, name) {
    return notebookModel.find({ user: user_id, name: name });
  }

function addNotebook(nb) {
    const nbToAdd = new notebookModel(nb);
    const promise = nbToAdd.save();
    return promise;
}

export default {
    findNotebookByUserIdAndName,
    addNotebook
}