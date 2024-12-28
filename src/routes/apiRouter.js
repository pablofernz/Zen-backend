const { Router } = require('express');
const { createTask, getTasks, getOneTask, updateTask, deleteTask } = require("../handlers/taskHandler")

const apiRouter = Router();

apiRouter.post("/tasks", createTask);
apiRouter.get("/tasks", getTasks)
apiRouter.get("/tasks/:id", getOneTask)
apiRouter.put("/tasks/:id", updateTask)
apiRouter.delete("/tasks/:id", deleteTask)

module.exports = apiRouter;
