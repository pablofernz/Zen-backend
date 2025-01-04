const mongoose = require('mongoose');
const Task = require('../../models/Task');
const User = require('../../models/User');


const taskDeleter = async ({ userID, taskID }) => {
    const userObjectId = new mongoose.Types.ObjectId(userID);
    const taskObjectId = new mongoose.Types.ObjectId(taskID);

    try {
        // Look for an element that has an ID equal to the ID passed by parameters
        const result = await User.updateOne(
            { _id: userObjectId, "tasks._id": taskObjectId },
            {
                $pull: {
                    "tasks": {
                        _id: taskObjectId
                    }
                }
            }
        )

        // the updateOne returns a object with the properties "matchedCount", indicating if an user with the userId exist, and "modifiedCount", indicating how many properties has updated
        if (result.matchedCount == 0) return { success: false, status: 400, message: "Task not found" };

        if (result.modifiedCount == 0) return { success: false, status: 400, message: "Tasks Not deleted" };

        return { success: true, status: 200, message: "Task deleted" };

    } catch (error) {
        // If an error occurs, return a 400 status code (client-side error) and an error message
        return { success: false, status: 400, message: error.message || "An error occurred while deleting the task" };
    }
};

module.exports = taskDeleter