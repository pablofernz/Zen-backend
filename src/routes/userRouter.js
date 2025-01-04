const { Router } = require('express');
const { createUser, loginUser } = require("../handlers/userHandler")
const userRouter = Router();
const { validateUserBody } = require("../validators/user")

userRouter.post("/create", createUser);
userRouter.post("/login", loginUser);



module.exports = userRouter;
