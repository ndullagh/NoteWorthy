import mongoose from "./db.js";



const NoteSchema = new mongoose.Schema(
  {
    notebook: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Notebook', // Reference to the User model
        required: true
    },
    title: {
        type: String,
        required: true,
        trim: true,
    },
    contents: {
        type: String,
        required: true,
        trim: true,
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
  { collection: "nw_notes" }
);

const Note = mongoose.model("Note", NoteSchema);

export default Note;