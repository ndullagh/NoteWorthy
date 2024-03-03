/*import mongoose from 'mongoose';
import Notebook from '../Notebook.js'; 
import User from '../User.js';

let userId; // Define a variable to store the ID of the created user
let userCreated = false; // Flag to indicate whether a user is created during the test
*/
/*
// Test case for creating a new Notebook document
test('should create a new Notebook', () => {
    const notebookData = {
      user: new mongoose.Types.ObjectId(),
      name: 'Test Notebook',
      color: 'blue',
    };
  
    // Create a user document for testing
    const user = new User({
        "username": "testuser",
        "email": "test@exampleee.com",
        "password": "pw123"
    });
  
    // Save the user document and then create a notebook associated with this user
    return user.save().then(savedUser => {
        userId = savedUser._id; // Store the user ID for later use
        userCreated = true; // Set the flag to true since a user was created
        notebookData.user = savedUser._id;
        const notebook = new Notebook(notebookData);
        return notebook.save().then(savedNotebook => {
        // Check if the saved document matches the provided data
        expect(savedNotebook._id).toBeDefined();
        expect(savedNotebook.user).toEqual(notebookData.user);
        expect(savedNotebook.name).toEqual(notebookData.name);
        expect(savedNotebook.color).toEqual(notebookData.color);
        expect(savedNotebook.tags).toEqual([]);
        expect(savedNotebook.created).toBeInstanceOf(Date);
        expect(savedNotebook.modified).toBeInstanceOf(Date);
        return;
      });
    });
  });
*/

// Test case for pre-save hook
/*test('should throw an error if user does not exist', () => {
  const notebookData = {
    user: new mongoose.Types.ObjectId(), // Assuming this user does not exist
    name: 'Test Notebook',
    color: 'blue',
  };
  const notebook = new Notebook(notebookData);

  // Expect saving the notebook to throw an error
  return expect(notebook.save()).rejects.toThrow('User does not exist');
});*/

/*afterEach(() => {
    if (userCreated) {
      // Delete the user document from the User collection using the stored ID
      return User.deleteOne({ _id: userId }).then(() => {
        userCreated = false; // Reset the flag after cleanup
      });
    }
  });*/

// You can add more test cases for additional schema validations and functionality
