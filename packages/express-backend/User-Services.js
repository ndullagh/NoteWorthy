import userModel from "./User.js";

function findUserByUserName(name) {
    return userModel.find({ username: name });
}

function addUser(user) {
    const userToAdd = new userModel(user);
    const promise = userToAdd.save();
    return promise;
}

export default {
    findUserByUserName,
    addUser
}