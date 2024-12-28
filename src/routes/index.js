const { Router } = require('express');
const apiRouter = require("./apiRouter")
const router = Router();

router.use("/api", apiRouter);

module.exports = router;
