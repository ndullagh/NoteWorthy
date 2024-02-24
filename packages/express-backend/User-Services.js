import userModel from "./User.js";
import mongoose from "./db.js";

function findUserById(user_id)
{
    if (!mongoose.Types.ObjectId.isValid(user_id)) {
        return Promise.reject({ statusCode: 400, message: 'Bad Request' });
    }
    return userModel.findById(user_id);
}

function findUserByUserName(name) {
    return userModel.find({ username: name });
}

function addUser(user) {
    const userToAdd = new userModel(user);
    const promise = userToAdd.save();
    return promise;
}

export default {
    findUserById,
    findUserByUserName,
    addUser
}