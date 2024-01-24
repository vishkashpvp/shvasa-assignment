const router = require("express").Router();
const {
  topicChain,
  descriptionChain,
  severityChain,
  typeChain,
  filterFieldChain,
  sortChain,
} = require("../middleware/ticket-validation");
const { validateFields } = require("../middleware/validation");
const { createSupportTicket, getAllSupportTickets } = require("../handlers/support-ticket");

// Create New Support Ticket
router.post(
  "/support-tickets",
  [topicChain(), descriptionChain(), severityChain(), typeChain()],
  validateFields,
  createSupportTicket
);

// Get All Support Tickets
router.get(
  "/support-tickets",
  [filterFieldChain(), sortChain()],
  validateFields,
  getAllSupportTickets
);

module.exports = router;
