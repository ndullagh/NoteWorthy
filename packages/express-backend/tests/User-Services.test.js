import UserServices from "../User-Services.js";
import NoteServices from "../Note-Services.js";
import NotebookServices from "../Notebook-Services.js";

test('add and delete user --success', async () => {
    try {
        // Step 1: Add a new user
        const newUser = {
            "username": "testman2",
            "email": "test2@exampleeeee.com",
            "password": "pw123"
        };
        const addedUser = await UserServices.addUser(newUser);
        console.log("User added:", addedUser);

        // Step 2: Add a new notebook
        const sampleNotebook = {
            "user": addedUser._id,
            "name": "Sample Notebook 4",
            "color": "blue",
            "tags": ["tag1", "tag2"],
            "created": new Date(),
            "modified": new Date()
        };
        const addedNotebook = await NotebookServices.addNotebook(sampleNotebook);
        console.log("Notebook added:", addedNotebook);

       //Step 3: Add a new note
        const sampleNote = {
            "notebook": addedNotebook._id,
            "title": "Sample Note3",
            "contents": "Test",
            "tags": ["tag1", "tag2"],
            "created": new Date(),
            "modified": new Date()
        }

        const addedNote = await NoteServices.addNote(sampleNote);
        console.log("Note added:", addedNote);
        expect(addedNote).toBeDefined();

        // Step 5: Delete the added user
        const deletedUser = await UserServices.userDelete(addedUser._id);
        console.log("Deleted user:", deletedUser);
        expect(deletedUser).toBeDefined();

        const foundNotebook = await NotebookServices.findNotebookById(addedNotebook._id);
        console.log("Found notebook:", foundNotebook);
        expect(foundNotebook).toBeNull();
        
        const foundNote = await NoteServices.findNoteById(addedNote._id);
        console.log("Found note:", foundNote);
        expect(foundNote).toBeNull();

    } catch (error) {
        console.error("Error:", error);
        throw error; // Re-throw the error to fail the test
    }//throw error; // Re-throw the error to fail the test
    
});

test('delete user, invalid id --fail', () => {
    return UserServices.userDelete('fakeid').then(() => {
        throw new Error('Expected userDelete to fail but it succeeded');
    }).catch(error => {
        // Check if the error message matches the expected error
        expect(error.message).toBe('Bad Request');
    });
});

test('delete user, that does not exist --fail', () => {
    return UserServices.userDelete('59e3ccd501154dcbf5f878b5').then(() => {
        throw new Error('Expected userDelete to fail but it succeeded');
    }).catch(error => {
        // Check if the error message matches the expected error
        expect(error.message).toBe('Resource Not Found');
    });
});


test('find user by _id  --success', async () => {
    try {
        // Step 1: Add a new user
        const newUser = {
            "username": "ausername",
            "email": "anemail",
            "password": "apw"
        };
        const addedUser = await UserServices.addUser(newUser);
        console.log("User added:", addedUser);

        // Step 3: Find the added notebook by ID
        const foundUser = await UserServices.findUserById(addedUser._id);
        console.log("Found user:", foundUser);
        expect(foundUser).toBeDefined();

        // Step 5: Delete the added user
        const deletedUser = await UserServices.userDelete(addedUser._id);
        console.log("Deleted user:", deletedUser);
        expect(deletedUser).toBeDefined();
    } catch (error) {
        console.error("Error:", error);
        throw error; // Re-throw the error to fail the test
    }
});

test('find user by _id, invalid _id --fail', () => {
    return UserServices.findUserById('fakeid').then(() => {
        throw new Error('Expected findUserById to fail but it succeeded');
    }).catch(error => {
        // Check if the error message matches the expected error
        expect(error.message).toBe('Bad Request');
    });
});

test('find user by username  --success', async () => {
    try {
        // Step 1: Add a new user
        const newUser = {
            "username": "ausername",
            "email": "anemail",
            "password": "apw"
        };
        const addedUser = await UserServices.addUser(newUser);
        console.log("User added:", addedUser);

        // Step 3: Find the added notebook by ID
        const foundUser = await UserServices.findUserByUserName(addedUser.username);
        console.log("Found user:", foundUser);
        expect(foundUser).toBeDefined();

        // Step 5: Delete the added user
        const deletedUser = await UserServices.userDelete(addedUser._id);
        console.log("Deleted user:", deletedUser);
        expect(deletedUser).toBeDefined();
    } catch (error) {
        console.error("Error:", error);
        throw error; // Re-throw the error to fail the test
    }
});

test('user findall --success', async () => {
    const newUser = {
        "username": "ausername",
        "email": "anemail",
        "password": "apw"
    };
    const addedUser = await UserServices.addUser(newUser);
    console.log("User added:", addedUser);

    // Step 3: Find the added notebook by ID
    const foundUser = await UserServices.findAll();
    console.log("Found user:", foundUser);
    expect(foundUser).toBeDefined();

    const deletedUser = await UserServices.userDelete(addedUser._id);
        console.log("Deleted user:", deletedUser);
        expect(deletedUser).toBeDefined();
})