const verifyToken = require("../auth/jwtVerifier");
const taskAdder = require("../controllers/tasks/createTask");
const taskDeleter = require("../controllers/tasks/deleteTask");
const manyTaskFinder = require('../controllers/tasks/getManyTasks');
const oneTaskFinder = require("../controllers/tasks/getOneTasks");
const taskUpdater = require("../controllers/tasks/updateTask");

// Function that create a new task based on the data provided in the body
const createTask = async (req, res) => {
    const { title, description, completed, createdAt } = req.body
    const authorization = req.get('authorization')

    try {
        // ---------------- Token validation -------------------------
        const tokenResult = verifyToken({ authorization, })
        if (tokenResult.status !== 200) return res.status(tokenResult.status).json(tokenResult);

        if (title.length < 10) return res.status(400).send({ success: false, errors: ["Title too short"] })

        // The 'taskAdder' function is called passing the data of req.body as an arguments to create a task
        const result = await taskAdder({ userID: tokenResult.data.tokenData.id, task: { title, description, completed, createdAt } })

        // If everything its ok, it return a 200 status code, a message and the new task
        return res.status(result.status).json(result)

    } catch (error) {
        // If an error occurs, return a 400 status code (client-side error) and an error message
        return res.status(400).json({ success: false, message: error.message })
    }

}


// Function that get all of the tasks or based on the 'status' provided in the query
const getTasks = async (req, res) => {
    const { completed } = req.query
    const authorization = req.get('authorization')

    try {
        // ---------------- Token validation -------------------------
        const tokenResult = verifyToken({ authorization, })
        if (tokenResult.status !== 200) return res.status(tokenResult.status).json(tokenResult);


        // The 'taskFinder' function is called passing the 'complete' as an argument to get tasks that match
        const result = await manyTaskFinder({ userID: tokenResult.data.tokenData.id, completed })

        // If tasks are found, respond with a 200 status code, a message and the found tasks data
        return res.status(result.status).json(result);

    } catch (error) {
        // If an error occurs, return a 400 status code (client-side error) and an error message
        return res.status(400).json({ success: false, status: 404, message: error.message });

    }
}

// Function that get only one of the tasks based on the ID provided in the query
const getOneTask = async (req, res) => {
    const { id } = req.params
    const authorization = req.get('authorization')

    try {
        // ---------------- Token validation -------------------------
        const tokenResult = verifyToken({ authorization })
        if (tokenResult.status !== 200) return res.status(tokenResult.status).json(tokenResult);

        // The 'taskFinder' function is called, passing the ID as an argument to get tasks that match
        const result = await oneTaskFinder({ userID: tokenResult.data.tokenData.id, taskID: id })

        // If no tasks are found, respond with a 404 status code and a message
        return res.status(result.status).json(result);


    } catch (error) {
        // If an error occurs, return a 400 status code (client-side error) and an error message
        return res.status(400).json({ success: false, status: 404, message: error.message });

    }
}

// Function that update a existing tasks based on the ID provided in the query
const updateTask = async (req, res) => {
    const { id } = req.params
    const { title, description, completed } = req.body
    const authorization = req.get('authorization')


    try {
        // ---------------- Token validation -------------------------
        const tokenResult = verifyToken({ authorization })
        if (tokenResult.status !== 200) return res.status(tokenResult.status).json(tokenResult);

        if (title.length < 10) return res.status(400).send({ success: false, status: 400, errors: ["Title too short"] })

        // The 'taskUpdater' function is called, passing the ID and the new data as arguments to update the existing task
        const result = await taskUpdater({ userID: tokenResult.data.tokenData.id, taskID: id, newTask: { title, description, completed } })

        return res.status(result.status).json(result)
    } catch (error) {
        // If an error occurs, return a 400 status code (client-side error) and an error message
        return res.status(400).json({ success: false, status: 400, message: error.message || "An error occurred while updating this task" })
    }
}

// Function that delete a existing tasks based on the ID provided in the query
const deleteTask = async (req, res) => {
    const { id } = req.params
    const authorization = req.get('authorization')

    try {
        // ---------------- Token validation -------------------------
        const tokenResult = verifyToken({ authorization })
        if (tokenResult.status !== 200) return res.status(tokenResult.status).json(tokenResult);

        // The 'taskDeleter' function is called, passing the userID and the taskID as an argument to delete the task
        const result = await taskDeleter({ userID: tokenResult.data.tokenData.id, taskID: id, })

        return res.status(result.status).json(result)

    } catch (error) {
        // If an error occurs, return a 400 status code (client-side error) and an error message
        return res.status(400).json({ success: false, status: 400, message: error.message || "An error occurred while deleting this task" })
    }
}

module.exports = {
    createTask,
    getTasks,
    getOneTask,
    updateTask,
    deleteTask
}