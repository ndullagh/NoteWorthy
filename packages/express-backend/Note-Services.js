import noteModel from "./Note.js";

function findNoteByNotebookIdAndName(notebook_id, title) {
    return noteModel.find({ notebook: notebook_id, title: title });
  }

function addNote(note) {
    const noteToAdd = new noteModel(note);
    const promise = noteToAdd.save();
    return promise;
}

export default {
    findNoteByNotebookIdAndName,
    addNote
}