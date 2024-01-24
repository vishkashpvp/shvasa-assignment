const SupportAgent = require("../models/support-agent");
const SupportTicket = require("../models/support-ticket");

let currentAgentIndex = 0;

async function createSupportTicket(req, res, next) {
  try {
    const { topic, description, severity, type } = req.body;
    const agents = await SupportAgent.find({}, { _id: 1, active: 1 });
    const ticket = new SupportTicket({ topic, description, severity, type });
    let counter = agents.length;
    while (counter--) {
      const currentAgent = agents[currentAgentIndex];
      currentAgentIndex = (currentAgentIndex + 1) % agents.length;
      if (currentAgent.active) {
        const agentUpdated = await SupportAgent.findByIdAndUpdate(currentAgent._id, {
          $set: { active: false },
        });
        if (!agentUpdated) {
          break;
        }
        ticket.assignedTo = currentAgent._id;
        ticket.status = "assigned";
        break;
      }
    }
    await ticket.save();
    res.status(201).json(ticket);
  } catch (err) {
    next(err);
  }
}

async function getAllSupportTickets(req, res, next) {
  try {
    const { filterField, filterValue, sort } = req.query;
    let { page = 1, limit = 10 } = req.query;
    const filter = filterField && filterValue ? { [filterField]: filterValue } : {};
    page = isNaN(Number(page)) ? 1 : page <= 0 ? 1 : page;
    limit = isNaN(Number(limit)) ? 10 : limit <= 0 ? 10 : limit;
    let [sortField, order] = [sort, 1];
    if (sort && sort.startsWith("-")) {
      sortField = sort.substring(1);
      order = -1;
    }
    const tickets = await SupportTicket.find(filter)
      .sort({ [sortField]: order })
      .skip((page - 1) * limit)
      .limit(limit);
    res.json({ page, limit, count: tickets.length, tickets });
  } catch (err) {
    next(err);
  }
}

module.exports = {
  createSupportTicket,
  getAllSupportTickets,
};
