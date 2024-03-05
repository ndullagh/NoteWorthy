import NotebookServices from '../Notebook-Services.js';
import UserServices from "../User-Services.js";
import NoteServices from "../Note-Services.js";


//note: figure out how best to actually test things. 
//i'm not sure if this 'toBeDefined' thing is actualy guaranteeing anything.
test('add and delete note --success', async () => {
    try {
        // Step 1: Add a new user
        const newUser = {
            "username": "testman",
            "email": "test@exampleeeee.com",
            "password": "pw123"
        };
        const addedUser = await UserServices.addUser(newUser);
        console.log("User added:", addedUser);

        // Step 2: Add a new notebook
        const sampleNotebook = {
            "user": addedUser._id,
            "name": "Sample Notebook 3",
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
            "title": "Sample Note2",
            "contents": "Test",
            "tags": ["tag1", "tag2"],
            "created": new Date(),
            "modified": new Date()
        }

        const addedNote = await NoteServices.addNote(sampleNote);
        console.log("Note added:", addedNote);
        expect(addedNote).toBeDefined();

        const deletedNote = await NoteServices.noteDelete(addedNote._id);
        console.log("Note deleted:", deletedNote);
        expect(deletedNote).toBeDefined();

        // Step 4: Delete the added notebook
        const deletedNotebook = await NotebookServices.notebookDelete(addedNotebook._id);
        console.log("Deleted notebook:", deletedNotebook);
        expect(deletedNotebook).toBeDefined();

        // Step 5: Delete the added user
        const deletedUser = await UserServices.userDelete(addedUser._id);
        console.log("Deleted user:", deletedUser);
        expect(deletedUser).toBeDefined();
    } catch (error) {
        console.error("Error:", error);
        throw error; // Re-throw the error to fail the test
    }
});


test('add new note with notebook that does not exist --fail', () => {
    const sampleNote = {
        "notebook": "59e3ccd501154dcbf5f878b5", //fake id
        "title": "Sample Note 2",
        "contents": "blue",
        "tags": ["tag1", "tag2"],
        "created": new Date(),
        "modified": new Date()
    };

    return NoteServices.addNote(sampleNote).then((addedNote) => {
        // If the promise resolves without error, the test should fail
        NoteServices.noteDelete(addedNote._id);
        throw new Error('Expected addNotebook to fail but it succeeded');
    })
    .catch(error => {
        // Check if the error message matches the expected error
        expect(error.message).toBe('Notebook does not exist');
    });
});

test('find note by _id, invalid _id --fail', () => {
    return NoteServices.findNoteById("fakeid").then(() => {
        throw new Error('Expected findNoteById to fail but it succeeded');
    }).catch((error) => {
        expect(error.message).toBe('Bad Request');
    })
});

test('find note by _id --success', async () => {
    try {
        // Step 1: Add a new user
        const newUser = {
            "username": "testman",
            "email": "test@exampleeeee.com",
            "password": "pw123"
        };
        const addedUser = await UserServices.addUser(newUser);
        console.log("User added:", addedUser);

        // Step 2: Add a new notebook
        const sampleNotebook = {
            "user": addedUser._id,
            "name": "Sample Notebook 3",
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
            "title": "Sample Note2",
            "contents": "Test",
            "tags": ["tag1", "tag2"],
            "created": new Date(),
            "modified": new Date()
        }

        const addedNote = await NoteServices.addNote(sampleNote);
        console.log("Note added:", addedNote);
        expect(addedNote).toBeDefined();

        const foundNote = await NoteServices.findNoteById(addedNote._id);
        console.log("Found note:", foundNote);
        expect(foundNote).toBeDefined();

        const deletedNote = await NoteServices.noteDelete(addedNote._id);
        console.log("Note deleted:", deletedNote);
        expect(deletedNote).toBeDefined();

        // Step 4: Delete the added notebook
        const deletedNotebook = await NotebookServices.notebookDelete(addedNotebook._id);
        console.log("Deleted notebook:", deletedNotebook);
        expect(deletedNotebook).toBeDefined();

        // Step 5: Delete the added user
        const deletedUser = await UserServices.userDelete(addedUser._id);
        console.log("Deleted user:", deletedUser);
        expect(deletedUser).toBeDefined();
    } catch (error) {
        console.error("Error:", error);
        throw error; // Re-throw the error to fail the test
    }
});

test('find note by user, invalid user --fail', () => {
    return NoteServices.findNotesByUser("fakeid").then(() => {
        throw new Error('Expected findNoteByUser to fail but it succeeded');
    }).catch((error) => {
        expect(error.message).toBe('Bad Request');
    });
});

test('find note by user, user does not exist --fail', () => {
    return NoteServices.findNotesByUser("59e3ccd501154dcbf5f878b5").then(() => {
        throw new Error('Expected findNoteByUser to fail but it succeeded');
    }).catch((error) => {
        expect(error.message).toBe('User Not Found');
    })
});

test('find note by user --success', async () => {
    try {
        // Step 1: Add a new user
        const newUser = {
            "username": "testman",
            "email": "test@exampleeeee.com",
            "password": "pw123"
        };
        const addedUser = await UserServices.addUser(newUser);
        console.log("User added:", addedUser);

        // Step 2: Add a new notebook
        const sampleNotebook = {
            "user": addedUser._id,
            "name": "Sample Notebook 3",
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
            "title": "Sample Note2",
            "contents": "Test",
            "tags": ["tag1", "tag2"],
            "created": new Date(),
            "modified": new Date()
        }

        const addedNote = await NoteServices.addNote(sampleNote);
        console.log("Note added:", addedNote);
        expect(addedNote).toBeDefined();

        const foundNote = await NoteServices.findNotesByUser(addedUser._id);
        console.log("Found note:", foundNote);
        expect(foundNote).toBeDefined();

        const deletedNote = await NoteServices.noteDelete(addedNote._id);
        console.log("Note deleted:", deletedNote);
        expect(deletedNote).toBeDefined();

        // Step 4: Delete the added notebook
        const deletedNotebook = await NotebookServices.notebookDelete(addedNotebook._id);
        console.log("Deleted notebook:", deletedNotebook);
        expect(deletedNotebook).toBeDefined();

        // Step 5: Delete the added user
        const deletedUser = await UserServices.userDelete(addedUser._id);
        console.log("Deleted user:", deletedUser);
        expect(deletedUser).toBeDefined();
    } catch (error) {
        console.error("Error:", error);
        throw error; // Re-throw the error to fail the test
    }
});




test('find note by user, invalid user and key --fail', () => {
    return NoteServices.findNotesByUserAndKey("fakeid", "key").then(() => {
        throw new Error('Expected findNoteByUserAndId to fail but it succeeded');
    }).catch((error) => {
        expect(error.message).toBe('Bad Request');
    });
});

test('find note by user and key, user does not exist --fail', () => {
    return NoteServices.findNotesByUserAndKey("59e3ccd501154dcbf5f878b5", "key").then(() => {
        throw new Error('Expected findNoteByUserAndKey to fail but it succeeded');
    }).catch((error) => {
        expect(error.message).toBe('User Not Found');
    })
});

test('find note by user and key --success', async () => {
    try {
        // Step 1: Add a new user
        const newUser = {
            "username": "testman",
            "email": "test@exampleeeee.com",
            "password": "pw123"
        };
        const addedUser = await UserServices.addUser(newUser);
        console.log("User added:", addedUser);

        // Step 2: Add a new notebook
        const sampleNotebook = {
            "user": addedUser._id,
            "name": "Sample Notebook 3",
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
            "title": "Sample Note2",
            "contents": "Test",
            "tags": ["tag1", "tag2"],
            "created": new Date(),
            "modified": new Date()
        }

        const addedNote = await NoteServices.addNote(sampleNote);
        console.log("Note added:", addedNote);
        expect(addedNote).toBeDefined();

        const foundNote = await NoteServices.findNotesByUserAndKey(addedUser._id, "key");
        console.log("Found note:", foundNote);
        expect(foundNote).toBeDefined();

        const deletedNote = await NoteServices.noteDelete(addedNote._id);
        console.log("Note deleted:", deletedNote);
        expect(deletedNote).toBeDefined();

        // Step 4: Delete the added notebook
        const deletedNotebook = await NotebookServices.notebookDelete(addedNotebook._id);
        console.log("Deleted notebook:", deletedNotebook);
        expect(deletedNotebook).toBeDefined();

        // Step 5: Delete the added user
        const deletedUser = await UserServices.userDelete(addedUser._id);
        console.log("Deleted user:", deletedUser);
        expect(deletedUser).toBeDefined();
    } catch (error) {
        console.error("Error:", error);
        throw error; // Re-throw the error to fail the test
    }
});




test('find note by notebook, invalid notebook --fail', () => {
    return NoteServices.findNotesByNotebook("fakeid").then(() => {
        throw new Error('Expected findNoteByNotebook to fail but it succeeded');
    }).catch((error) => {
        expect(error.message).toBe('Bad Request');
    });
});

test('find note by notebook, notebook does not exist --fail', () => {
    return NoteServices.findNotesByNotebook("59e3ccd501154dcbf5f878b5").then(() => {
        throw new Error('Expected findNoteByNotebook to fail but it succeeded');
    }).catch((error) => {
        expect(error.message).toBe('Resource Not Found');
    })
});

test('find note by notebook --success', async () => {
    try {
        // Step 1: Add a new user
        const newUser = {
            "username": "testman",
            "email": "test@exampleeeee.com",
            "password": "pw123"
        };
        const addedUser = await UserServices.addUser(newUser);
        console.log("User added:", addedUser);

        // Step 2: Add a new notebook
        const sampleNotebook = {
            "user": addedUser._id,
            "name": "Sample Notebook 3",
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
            "title": "Sample Note2",
            "contents": "Test",
            "tags": ["tag1", "tag2"],
            "created": new Date(),
            "modified": new Date()
        }

        const addedNote = await NoteServices.addNote(sampleNote);
        console.log("Note added:", addedNote);
        expect(addedNote).toBeDefined();

        const foundNote = await NoteServices.findNotesByNotebook(addedNotebook._id);
        console.log("Found note:", foundNote);
        expect(foundNote).toBeDefined();

        const deletedNote = await NoteServices.noteDelete(addedNote._id);
        console.log("Note deleted:", deletedNote);
        expect(deletedNote).toBeDefined();

        // Step 4: Delete the added notebook
        const deletedNotebook = await NotebookServices.notebookDelete(addedNotebook._id);
        console.log("Deleted notebook:", deletedNotebook);
        expect(deletedNotebook).toBeDefined();

        // Step 5: Delete the added user
        const deletedUser = await UserServices.userDelete(addedUser._id);
        console.log("Deleted user:", deletedUser);
        expect(deletedUser).toBeDefined();
    } catch (error) {
        console.error("Error:", error);
        throw error; // Re-throw the error to fail the test
    }
});




test('find note by notebook, invalid notebook and key --fail', () => {
    return NoteServices.findNotesByNotebookAndKey("fakeid", "key").then(() => {
        throw new Error('Expected findNoteByNotebookAndKey to fail but it succeeded');
    }).catch((error) => {
        expect(error.message).toBe('Bad Request');
    });
});

test('find note by notebook and key, notebook does not exist --fail', () => {
    return NoteServices.findNotesByNotebookAndKey("59e3ccd501154dcbf5f878b5", "key").then(() => {
        throw new Error('Expected findNoteByNotebookAndKey to fail but it succeeded');
    }).catch((error) => {
        expect(error.message).toBe('Resource Not Found');
    })
});

test('find note by notebook and key --success', async () => {
    try {
        // Step 1: Add a new user
        const newUser = {
            "username": "testman",
            "email": "test@exampleeeee.com",
            "password": "pw123"
        };
        const addedUser = await UserServices.addUser(newUser);
        console.log("User added:", addedUser);

        // Step 2: Add a new notebook
        const sampleNotebook = {
            "user": addedUser._id,
            "name": "Sample Notebook 3",
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
            "title": "Sample Note2",
            "contents": "Test",
            "tags": ["tag1", "tag2"],
            "created": new Date(),
            "modified": new Date()
        }

        const addedNote = await NoteServices.addNote(sampleNote);
        console.log("Note added:", addedNote);
        expect(addedNote).toBeDefined();

        const foundNote = await NoteServices.findNotesByNotebookAndKey(addedNotebook._id, "key");
        console.log("Found note:", foundNote);
        expect(foundNote).toBeDefined();

        const deletedNote = await NoteServices.noteDelete(addedNote._id);
        console.log("Note deleted:", deletedNote);
        expect(deletedNote).toBeDefined();

        // Step 4: Delete the added notebook
        const deletedNotebook = await NotebookServices.notebookDelete(addedNotebook._id);
        console.log("Deleted notebook:", deletedNotebook);
        expect(deletedNotebook).toBeDefined();

        // Step 5: Delete the added user
        const deletedUser = await UserServices.userDelete(addedUser._id);
        console.log("Deleted user:", deletedUser);
        expect(deletedUser).toBeDefined();
    } catch (error) {
        console.error("Error:", error);
        throw error; // Re-throw the error to fail the test
    }
});

test('delete note, invalid id --fail', () => {
    return NoteServices.noteDelete('fakeid').then(() => {
        throw new Error('Expected noteDelete to fail but it succeeded');
    }).catch(error => {
        // Check if the error message matches the expected error
        expect(error.message).toBe('Bad Request');
    });
});

test('delete note, not found --fail', () => {
    return NoteServices.noteDelete('59e3ccd501154dcbf5f878b5').then(() => { //fake but valid id
        throw new Error('Expected noteDelete to fail but it succeeded');
    }).catch(error => {
        // Check if the error message matches the expected error
        expect(error.message).toBe('Resource Not Found');
    });
});