const router = require("express").Router();
const {
  nameChain,
  emailChain,
  phoneChain,
  descriptionChain,
} = require("../middleware/agent-validation");
const { validateFields } = require("../middleware/validation");
const { createSupportAgent } = require("../handlers/support-agent");

// Create New Support Agent
router.post(
  "/support-agents",
  [nameChain(), emailChain(), phoneChain(), descriptionChain()],
  validateFields,
  createSupportAgent
);

module.exports = router;
