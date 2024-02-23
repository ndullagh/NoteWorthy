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
        required: true,
        default: Date.now // Set default value to current date and time when a new document is created
    },
    modified: {
        type: Date,
        required: true,
        default: Date.now // Set default value to current date and time when a new document is created
    }
  },
  { collection: "nw_notebooks" }
);

// Define a pre-save hook to check if the provided user ID exists in the User collection
NotebookSchema.pre('save', async function(next) {
    try {
      const UserModel = mongoose.model('User');
      const userExists = await UserModel.exists({ _id: this.user });
      if (!userExists) {
        throw new Error('User does not exist');
      }
      next();
    } catch (error) {
      next(error);
    }
  });

const Notebook = mongoose.model("Notebook", NotebookSchema);

export default Notebook;