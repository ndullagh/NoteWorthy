import notebookModel from "./Notebook.js";
import userModel from "./User.js";
import noteModel from "./Note.js";
import mongoose from "./db.js";

function findNotebookById(notebook_id) {
  if (!mongoose.Types.ObjectId.isValid(notebook_id)) {
    return Promise.reject({
      statusCode: 400,
      message: "Bad Request"
    });
  }
  return notebookModel.findById(notebook_id);
}

function findNotebookByUserIdAndKey(user_id, key) {
  if (!mongoose.Types.ObjectId.isValid(user_id)) {
    return Promise.reject({
      statusCode: 400,
      message: "Bad Request"
    });
  }
  return userModel.findById(user_id).then((result) => {
    if (!result) {
      return Promise.reject({
        statusCode: 404,
        message: "Resource Not Found"
      });
    } else {
      return notebookModel.find({
        user: user_id,
        name: { $regex: key, $options: "i" }
      });
    }
  });
}

function findNotebookByUserId(user_id) {
  if (!mongoose.Types.ObjectId.isValid(user_id)) {
    return Promise.reject({
      statusCode: 400,
      message: "Bad Request"
    });
  }
  return notebookModel.find({ user: user_id });
}

function addNotebook(nb) {
  const nbToAdd = new notebookModel(nb);
  const promise = nbToAdd.save();
  return promise;
}

function notebookDelete(id) {
  if (!mongoose.Types.ObjectId.isValid(id)) {
    return Promise.reject({
      statusCode: 400,
      message: "Bad Request"
    });
  }

  // Find the notebook
  return notebookModel.findById(id).then((result) => {
    if (!result) {
      return Promise.reject({
        statusCode: 404,
        message: "Resource Not Found"
      });
    } else {
      // Find all notes associated with the notebook ID and delete them
      return noteModel.deleteMany({ notebook: id }).then(() => {
        // After deleting the associated notes, delete the notebook itself
        return notebookModel
          .findByIdAndDelete(id)
          .then((notebook) => {
            /*if (!notebook) {
              return Promise.reject({
                statusCode: 404,
                message: "Resource Not Found"
              });
            } else {
              return notebook;
            }*/
            return notebook;
          });
      });
    }
  });
}

export default {
  findNotebookById,
  findNotebookByUserIdAndKey,
  findNotebookByUserId,
  addNotebook,
  notebookDelete
};
