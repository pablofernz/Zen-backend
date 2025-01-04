const { Router } = require('express');
const apiRouter = require("./apiRouter");
const userRouter = require('./userRouter');
const router = Router();

router.use("/api", apiRouter);
router.use("/user", userRouter);

module.exports = router;
