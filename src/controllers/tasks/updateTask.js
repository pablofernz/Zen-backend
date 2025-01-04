const User = require('../../models/User');
const mongoose = require("mongoose")

const taskUpdater = async ({ userID, taskID, newTask }) => {
    const userObjectId = new mongoose.Types.ObjectId(userID);
    const taskObjectId = new mongoose.Types.ObjectId(taskID);

    try {
        // If the task is found, it is compared to the current task data, if nothing change return a message
        const result = await User.updateOne(
            { _id: userObjectId, "tasks._id": taskObjectId },
            {
                $set: {
                    "tasks.$.title": newTask.title,
                    "tasks.$.description": newTask.description,
                    "tasks.$.completed": newTask.completed
                }
            }
        )

        // the updateOne returns a object with the properties "matchedCount", indicating if an user with the userId exist, and "modifiedCount", indicating how many properties has updated
        if (result.matchedCount == 0) return { success: false, status: 400, message: "User not found" };

        if (result.modifiedCount == 0) return { success: false, status: 400, message: "There are no changes" };


        // If there are changes, it is updated and a message is returned
        if (result.modifiedCount > 0) return {
            success: true,
            status: 200,
            message: "Task updated successfully"
        };

    } catch (error) {
        // If an error occurs, return a 400 status code (client-side error) and an error message
        return { success: false, status: 400, message: [error.message] || "An error occurred while updating the task" };
    }
};

module.exports = taskUpdater