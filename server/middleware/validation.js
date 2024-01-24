const { validationResult } = require("express-validator");
const createHttpError = require("http-errors");

function validateFields(req, res, next) {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return next(createHttpError.BadRequest(errors.array()));
  }
  next();
}

module.exports = {
  validateFields,
};
