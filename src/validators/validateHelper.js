const { validationResult } = require("express-validator")

const validateResult = (req, res, next) => {
    const errors = validationResult(req);  // Obtiene los errores de validación de la solicitud

    if (!errors.isEmpty()) {
        // Si hay errores, devuelve una respuesta con el estado 400 y los errores
        return res.status(400).json({ success: false, errors: errors.array().map(error => error.msg) });
    }
    next();
}

module.exports = { validateResult };