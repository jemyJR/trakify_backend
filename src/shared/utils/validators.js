const { check, validationResult } = require("express-validator");
const { BadRequestException } = require("../exceptions/http.exceptions");

exports.nameValidator = (field = "name") =>
  check(field)
    .trim()
    .notEmpty()
    .withMessage("Name is required")
    .isLength({ min: 3 })
    .withMessage("Name must be at least 3 characters long")
    .isAlpha("en-US", { ignore: " " })
    .withMessage("Name must contain only letters");

exports.nameValidatorWithOptional = (field = "name") =>
  check(field)
    .optional({ checkFalsy: true })
    .trim()
    .isLength({ min: 3 })
    .withMessage("Name must be at least 3 characters long")
    .isAlpha("en-US", { ignore: " " })
    .withMessage("Name must contain only letters");

exports.emailValidator = (field = "email") =>
  check(field)
    .trim()
    .notEmpty()
    .withMessage("Email is required")
    .isEmail()
    .withMessage("Invalid email format")
    .normalizeEmail();

exports.emailValidatorWithOptional = (field = "email") =>
  check(field)
    .optional({ checkFalsy: true })
    .trim()
    .isEmail()
    .withMessage("Invalid email format")
    .normalizeEmail();

exports.passwordValidator = (field = "password") =>
  check(field)
    .notEmpty()
    .withMessage("Password is required")
    .isLength({ min: 6 })
    .withMessage("Password must be at least 6 characters long")
    .matches(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)[a-zA-Z\d]/)
    .withMessage(
      "Password must contain at least one uppercase letter, one lowercase letter, and one number"
    );

exports.passwordValidatorWithOptional = (field = "password") =>
  check(field)
    .optional({ checkFalsy: true })
    .isLength({ min: 6 })
    .withMessage("Password must be at least 6 characters long")
    .matches(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)[a-zA-Z\d]/)
    .withMessage(
      "Password must contain at least one uppercase letter, one lowercase letter, and one number"
    );

exports.validate = async (req, res, next) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    const details = errors.array().reduce((acc, err) => {
      acc[err.path] = err.msg;
      return acc;
    }, {});

    return next(
      new BadRequestException("Validation errors occurred", { details })
    );
  }
  next();
};
