const { body, validationResult } = require("express-validator");

const validation = (fields) => {
  const rules = []

  if (fields.includes("username")) {
    rules.push(
      body("username")
      .trim()
      .escape()
      .notEmpty()
      .withMessage("Username cannot be empty.")
      .matches(/^[a-z0-9]/)
      .withMessage("Username must be lowercase and numbers.")
      .escape()
    )
  }

  if (fields.includes("email")) {
    rules.push(
      body("email")
      .trim()
      .notEmpty()
      .withMessage("Email cannot be empty.")
      .isEmail()
      .withMessage("This email is invalid")
      .normalizeEmail()
    )
  }

  if (fields.includes("password")) {
    rules.push(
      body("password")
      .trim()
      .notEmpty().withMessage("Password is required.")
      .isAlphanumeric().withMessage("Password must be letters or numbers.")
      .escape()
    )
  }

  rules.push(
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
    }
  )

  return rules
}

module.exports = validation;
