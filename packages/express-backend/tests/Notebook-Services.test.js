import NotebookServices from '../Notebook-Services.js'
import UserServices from "../User-Services.js"

test('add and delete new notebook and user --success', () => {
    const newUser = {
        "username": "testuser",
        "email": "test@exampleee.com",
        "password": "pw123"
    }
    return UserServices.addUser(newUser).then((addedUser) => {
        expect(addedUser).toBeDefined();
        const sampleNotebook = {
            "user": addedUser._id,
            "name": "Sample Notebook",
            "color": "blue",
            "tags": ["tag1", "tag2"],
            "created": new Date(),
            "modified": new Date()
        };
        return NotebookServices.addNotebook(sampleNotebook).then((addedNotebook) => {
            expect(addedNotebook).toBeDefined();
            NotebookServices.notebookDelete(addedNotebook._id).then((deletedNotebook) => {
                return expect(deletedNotebook).toBeDefined();
                
            }).catch((error) => {
                console.log(error);
            });

            return UserServices.userDelete(addedUser._id).then((deletedUser) => {
                return expect(deletedUser).toBeDefined();
                
            }).catch((error) => {
                console.log(error);
            });
        }).catch((error) => {
            console.log(error);
        });
    }).catch((error) => {
        console.log(error);
    });
    
   
});



test('add new notebook with user that does not exist --fail', () => {
    const sampleNotebook = {
        "user": "59e3ccd501154dcbf5f878b5", //fake id
        "name": "Sample Notebook",
        "color": "blue",
        "tags": ["tag1", "tag2"],
        "created": new Date(),
        "modified": new Date()
    };

    return NotebookServices.addNotebook(sampleNotebook).then((addedNotebook) => {
        // If the promise resolves without error, the test should fail
        NotebookServices.notebookDelete(addedNotebook);
        throw new Error('Expected addNotebook to fail but it succeeded');
    })
    .catch(error => {
        // Check if the error message matches the expected error
        expect(error.message).toBe('User does not exist');
    });
});


test('find notebook by _id #3 --success', async () => {
    try {
        // Step 1: Add a new user
        const newUser = {
            "username": "testuser",
            "email": "test@exampleee.com",
            "password": "pw123"
        };
        const addedUser = await UserServices.addUser(newUser);

        // Step 2: Add a new notebook
        const sampleNotebook = {
            "user": addedUser._id,
            "name": "Sample Notebook",
            "color": "blue",
            "tags": ["tag1", "tag2"],
            "created": new Date(),
            "modified": new Date()
        };
        const addedNotebook = await NotebookServices.addNotebook(sampleNotebook);

        // Step 3: Find the added notebook by ID
        const foundNotebook = await NotebookServices.findNotebookById(addedNotebook._id);
        expect(foundNotebook).toBeDefined();

        // Step 4: Delete the added notebook
        const deletedNotebook = await NotebookServices.notebookDelete(addedNotebook._id);
        expect(deletedNotebook).toBeDefined();

        // Step 5: Delete the added user
        const deletedUser = await UserServices.userDelete(addedUser._id);
        expect(deletedUser).toBeDefined();
    } catch (error) {
        console.error("Error:", error);
        throw error; // Re-throw the error to fail the test
    }
});


test('find notebook by _id, invalid _id --fail', () => {
    return NotebookServices.findNotebookById('fakeid').then(() => {
        throw new Error('Expected findNotebookById to fail but it succeeded');
    }).catch(error => {
        // Check if the error message matches the expected error
        expect(error.message).toBe('Bad Request');
    });
});

test('find notebook by user, invalid user --fail', () => {
    return NotebookServices.findNotebookByUserId('fakeid').then(() => {
        throw new Error('Expected findNotebookByUserId to fail but it succeeded');
    }).catch(error => {
        // Check if the error message matches the expected error
        expect(error.message).toBe('Bad Request');
    });
});


test('find notebook by user #2 --success', async () => {
    try {
        // Step 1: Add a new user
        const newUser = {
            "username": "testuser",
            "email": "test@exampleee.com",
            "password": "pw123"
        };
        const addedUser = await UserServices.addUser(newUser);

        // Step 2: Add a new notebook
        const sampleNotebook = {
            "user": addedUser._id,
            "name": "Sample Notebook",
            "color": "blue",
            "tags": ["tag1", "tag2"],
            "created": new Date(),
            "modified": new Date()
        };
        const addedNotebook = await NotebookServices.addNotebook(sampleNotebook);

        // Step 3: Find the added notebook by user
        const foundNotebook = await NotebookServices.findNotebookByUserId(addedNotebook.user);
        expect(foundNotebook).toBeDefined();

        // Step 4: Delete the added notebook
        const deletedNotebook = await NotebookServices.notebookDelete(addedNotebook._id);
        expect(deletedNotebook).toBeDefined();

        // Step 5: Delete the added user
        const deletedUser = await UserServices.userDelete(addedUser._id);
        expect(deletedUser).toBeDefined();
    } catch (error) {
        console.error("Error:", error);
        throw error; // Re-throw the error to fail the test
    }
});

test('find notebook by user and key, invalid user --fail', () => {
    return NotebookServices.findNotebookByUserIdAndKey('fakeid', 'test').then(() => {
        throw new Error('Expected findNotebookByUserAndKeyId to fail but it succeeded');
    }).catch(error => {
        // Check if the error message matches the expected error
        expect(error.message).toBe('Bad Request');
    });
});

test('find notebook by user and key --success', async () => {
    try {
        // Step 1: Add a new user
        const newUser = {
            "username": "testuser",
            "email": "test@exampleee.com",
            "password": "pw123"
        };
        const addedUser = await UserServices.addUser(newUser);

        // Step 2: Add a new notebook
        const sampleNotebook = {
            "user": addedUser._id,
            "name": "Sample Notebook",
            "color": "blue",
            "tags": ["tag1", "tag2"],
            "created": new Date(),
            "modified": new Date()
        };
        const addedNotebook = await NotebookServices.addNotebook(sampleNotebook);

        // Step 3: Find the added notebook by user
        const foundNotebook = await NotebookServices.findNotebookByUserIdAndKey(addedNotebook.user, 'Sample');
        expect(foundNotebook).toBeDefined();

        // Step 4: Delete the added notebook
        const deletedNotebook = await NotebookServices.notebookDelete(addedNotebook._id);
        expect(deletedNotebook).toBeDefined();

        // Step 5: Delete the added user
        const deletedUser = await UserServices.userDelete(addedUser._id);
        expect(deletedUser).toBeDefined();
    } catch (error) {
        console.error("Error:", error);
        throw error; // Re-throw the error to fail the test
    }
});

test('find notebook by user and key, user not found -- fail', () => {
    return NotebookServices.findNotebookByUserIdAndKey("59e3ccd501154dcbf5f878b5", 'NotFound').then(()=> {
        throw new Error('Expected findNotebookByUserIdAndKey to fail but it succeeded');
    }).catch(error => {
        // Check if the error message matches the expected error
        expect(error.message).toBe('Resource Not Found');
    }); //fake but valid user
});

test('delete notebook, invalid id --fail', () => {
    return NotebookServices.notebookDelete('fakeid').then(() => {
        throw new Error('Expected deleteNotebook to fail but it succeeded');
    }).catch(error => {
        // Check if the error message matches the expected error
        expect(error.message).toBe('Bad Request');
    });
});

test('delete notebook, not found --fail', () => {
    return NotebookServices.notebookDelete('59e3ccd501154dcbf5f878b5').then(() => { //fake but valid id
        throw new Error('Expected deleteNotebook to fail but it succeeded');
    }).catch(error => {
        // Check if the error message matches the expected error
        expect(error.message).toBe('Resource Not Found');
    });
});