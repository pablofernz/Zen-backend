const User = require('../../models/User');
const mongoose = require('mongoose');

const oneTaskFinder = async ({ userID, taskID }) => {
    const userObjectId = new mongoose.Types.ObjectId(userID);
    const taskObjectId = new mongoose.Types.ObjectId(taskID);

    try {

        const result = await User.aggregate([
            { $match: { _id: userObjectId } }, // Filter for user
            {
                $project: {
                    tasks: {
                        $filter: {
                            input: "$tasks", // access "stacks" array
                            as: "task", // identifier for each object in there
                            cond: { $eq: ["$$task._id", taskObjectId] } // return those tasks who their id is equal to id coming by params
                        }
                    }
                }
            }
        ]);

        if (result.length === 0) { // if users doesn't match, it returns a empty array
            return { success: false, status: 404, message: "User not found" };
        }

        if (result[0].tasks.length === 0) {  // if no tasks are found, it returns a empty array in "tasks" property
            return { success: true, status: 404, message: "Task not found", }
        }
        // if users match and tasks are found, it returns a standar "status 200 response"
        return { success: true, status: 200, message: "Task Found", data: result[0].tasks };

    } catch (error) {
        return { success: false, status: 500, errors: [error.message || "Error fetching user"] };
    }
}


module.exports = oneTaskFinder