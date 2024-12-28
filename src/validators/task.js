const { check, param } = require("express-validator")
const { validateResult } = require("./validateHelper")

const validateTaskBody = () => {
    return [
        check("title").exists().notEmpty().withMessage("Must provide a task title"),
        check("description").optional().trim(),
        check("completed").exists().isBoolean(),

        (req, res, next) => {
            validateResult(req, res, next);
        }
    ];
};


const validateIdParam = () => [
    param('id')
        .exists().withMessage('ID is required')
        .isMongoId().withMessage('Invalid ID format'),
    (req, res, next) => {
        validateResult(req, res, next);
    }
];
module.exports = { validateTaskBody, validateIdParam }