const { Router } = require('express');
const { createUser, loginUser, thirdPartyAccess } = require("../handlers/userHandler")
const userRouter = Router();
const { validateUserBody } = require("../validators/user")

userRouter.post("/create", validateUserBody(), createUser);
userRouter.post("/login", validateUserBody(), loginUser);
userRouter.post("/access/thirdparty", thirdPartyAccess);



module.exports = userRouter;
