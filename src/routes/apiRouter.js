const { Router } = require('express');
const { createTask, getTasks, getOneTask, updateTask, deleteTask } = require("../handlers/taskHandler")
const apiRouter = Router();
const { validateTaskBody, validateIdParam } = require("../validators/task")

apiRouter.post("/tasks", validateTaskBody(), createTask);
apiRouter.get("/tasks", getTasks)
apiRouter.get("/task/:id?", validateIdParam(), getOneTask)
apiRouter.put("/task/:id?", validateIdParam(), updateTask)
apiRouter.delete("/task/:id?", validateIdParam(), deleteTask)

module.exports = apiRouter;
