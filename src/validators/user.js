const { check } = require("express-validator")
const { validateResult } = require("./validateHelper")

const validateUserBody = () => {
    return [
        check("email").exists().notEmpty().withMessage("Must provide a email"),
        check("email").isEmail().withMessage("Invalid email"),
        check("password").exists().notEmpty().withMessage("Must provide a password"),
        (req, res, next) => {
            validateResult(req, res, next);
        }
    ];
};

module.exports = { validateUserBody }