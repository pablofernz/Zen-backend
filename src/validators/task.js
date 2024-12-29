const { check, param } = require("express-validator")
const { validateResult } = require("./validateHelper")

// This validator verifies that a title is sent in the req.body and a few other things at the time of task creation,
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

// This validator check that an ID is sent by params when necessary,
const validateIdParam = () => [
    param('id')
        .exists().withMessage('ID is required')
        .isMongoId().withMessage('Invalid ID format'),
    (req, res, next) => {
        validateResult(req, res, next);
    }
];
module.exports = { validateTaskBody, validateIdParam }