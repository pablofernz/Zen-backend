const User = require('../../models/User')
const mongoose = require("mongoose")

const taskAdder = async ({ userID, task }, res) => {
    const userObjectId = new mongoose.Types.ObjectId(userID);

    try {
        const result = await User.updateOne({ _id: userObjectId }, { $push: { tasks: task } })

        // the updateOne returns a object with the properties "matchedCount", indicating if an user with the userId exist, and "modifiedCount", indicating how many properties has updated
        if (result.matchedCount == 0) return { success: false, status: 400, message: "User not found" };
        if (result.modifiedCount == 0) return { success: false, status: 400, message: "There are no changes" };


        // If there are changes, it is updated and a message is returned
        return {
            success: true,
            status: 201,
            message: "Task created successfully"
        };

    } catch (error) {
        return { success: false, status: 500, errors: [error.message || "Error adding task"] };

    }

}

module.exports = taskAdder