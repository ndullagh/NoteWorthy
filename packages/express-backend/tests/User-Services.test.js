import UserServices from "../User-Services.js";

test('add and delete user --success', async () => {
    try {
        // Step 1: Add a new user
        const newUser = {
            "username": "ausername",
            "email": "anemail",
            "password": "apw"
        };
        const addedUser = await UserServices.addUser(newUser);
        console.log("User added:", addedUser);
        expect(addedUser).toBeDefined();

        // Step 5: Delete the added user
        const deletedUser = await UserServices.userDelete(addedUser._id);
        console.log("Deleted user:", deletedUser);
        expect(deletedUser).toBeDefined();
    } catch (error) {
        console.error("Error:", error);
        throw error; // Re-throw the error to fail the test
    }
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