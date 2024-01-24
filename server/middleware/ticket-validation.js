const { body, query } = require("express-validator");

const severityLevels = ["critical", "high", "medium", "low"];
const typeValues = ["bug", "assistance", "feature", "feedback", "refund"];
const filterFields = ["status", "assignedTo", "severity", "type"];
const sortFields = ["resolvedOn", "dateCreated", "-resolvedOn", "-dateCreated"];

const topicChain = () => body("topic").trim().notEmpty().withMessage("Topic is required");

const descriptionChain = () =>
  body("description").trim().notEmpty().withMessage("Description is required");

const severityChain = () =>
  body("severity")
    .trim()
    .notEmpty()
    .withMessage("Severity is required")
    .toLowerCase()
    .isIn(severityLevels)
    .withMessage(`Allowed values are ${severityLevels.join(", ")}`);

const typeChain = () =>
  body("type")
    .trim()
    .notEmpty()
    .withMessage("Type is required")
    .toLowerCase()
    .isIn(typeValues)
    .withMessage(`Allowed values are ${typeValues.join(", ")}`);

const filterFieldChain = () =>
  query("filterField")
    .optional()
    .isIn(filterFields)
    .withMessage(`Allowed values are ${filterFields.join(", ")}`);

const sortChain = () =>
  query("sort")
    .optional()
    .isIn(sortFields)
    .withMessage(`Allowed values are ${sortFields.join(", ")}`);

module.exports = {
  topicChain,
  descriptionChain,
  severityChain,
  typeChain,
  filterFieldChain,
  sortChain,
};
