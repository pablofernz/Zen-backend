const { Router } = require('express');
const { createTask, getTasks, getOneTask, updateTask, deleteTask } = require("../handlers/taskHandler")
const apiRouter = Router();
const { validateTaskBody, validateIdParam } = require("../validators/task")

// apiRouter.post("/tasks", validateTaskBody(), createTask);
apiRouter.post("/tasks", validateTaskBody(), createTask);
apiRouter.get("/tasks", getTasks)
apiRouter.get("/tasks/:id?", validateIdParam(), getOneTask)
apiRouter.put("/tasks/:id?", validateIdParam(), updateTask)
apiRouter.delete("/tasks/:id?", validateIdParam(), deleteTask)

module.exports = apiRouter;
