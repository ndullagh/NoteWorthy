import mongoose from "./db.js";



const NotebookSchema = new mongoose.Schema(
  {
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User', // Reference to the User model
        required: true
    },
    name: {
        type: String,
        required: true,
        trim: true,
    },
    color: {
        type: String,
        required: true,
        trim: true,
        /*validate(value) {
        }, //use to enforce password requirements. passwords must be hashed before being entered. */
    },
    tags: [{ // Array of string tags
        type: String, 
        trim: true 
    }], 
    created: {
        type: Date,
        default: Date.now // Set default value to current date and time when a new document is created
      },
      modified: {
        type: Date,
        default: Date.now // Set default value to current date and time when a new document is created
      }
  },
  { collection: "nw_notebooks" }
);

const Notebook = mongoose.model("Notebook", NotebookSchema);

export default Notebook;