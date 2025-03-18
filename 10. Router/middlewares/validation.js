const { body, validationResult } = require("express-validator");

const validation = [
  body("username")
    .trim()
    .escape()
    .notEmpty()
    .withMessage("Username cannot be empty.")
    .matches(/^[a-z0-9]/)
    .withMessage("Username must be lowercase and numbers."),
  body("email")
    .trim()
    .notEmpty()
    .withMessage("Email cannot be empty.")
    .isEmail()
    .withMessage("This email is invalid")
    .normalizeEmail(),
  (req, res, next) => {
    const errors = validationResult(req);

    if (!errors.isEmpty()) {
      return res.status(400).json({
        Message: "Registration failed.",
        Errors: errors.array().reduce((acc, err) => {
          if (!acc[err.path]) {
            acc[err.path] = err.msg;
          }

          return acc;
        }, {}),
      });
    }

    next();
  },
];

module.exports = validation;
