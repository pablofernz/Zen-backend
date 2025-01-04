const User = require('../../models/User');
const mongoose = require('mongoose');

const manyTaskFinder = async ({ userID, completed }) => {
    const userObjectId = new mongoose.Types.ObjectId(userID);
    const statusInBoolean = completed === "true" ? true : false
    let result

    try {
        if (!completed) {
            result = await User.aggregate([{ $match: { _id: userObjectId } }]);

        } else {
            result = await User.aggregate([{ $match: { _id: userObjectId } }, {
                $project: {
                    tasks: {
                        $filter: {
                            input: "$tasks", // access "stacks" array
                            as: "task", //identifier for each object in there 
                            cond: { $eq: ["$$task.completed", statusInBoolean] } // return the completed or pending tasks
                        }
                    }
                }
            }]);
        }

        if (result.length === 0) {
            return { success: false, status: 404, message: "User not found" };
        }
        if (result[0].tasks.length === 0) {
            return { success: false, status: 404, message: "Tasks not found", }
        }

        return { success: true, status: 200, message: "Tasks Found", data: result[0].tasks };

    } catch (error) {
        return { success: false, status: 500, errors: [error.message || "Error fetching user"] };
    }
}


module.exports = manyTaskFinder