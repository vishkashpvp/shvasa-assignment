const { body } = require("express-validator");

const nameChain = () => body("name").trim().notEmpty().withMessage("Name is required");

const emailChain = () =>
  body("email")
    .notEmpty()
    .withMessage("Email is required")
    .trim()
    .isEmail()
    .withMessage("Invalid email format");

const phoneChain = () =>
  body("phone")
    .notEmpty()
    .withMessage("Phone is required")
    .trim()
    .isMobilePhone()
    .withMessage("Invalid phone number format");

const descriptionChain = () =>
  body("description").notEmpty().withMessage("Description is required").trim();

module.exports = {
  nameChain,
  emailChain,
  phoneChain,
  descriptionChain,
};
