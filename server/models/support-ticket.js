const mongoose = require("mongoose");

const schema = new mongoose.Schema(
  {
    topic: { type: String, required: true },
    description: { type: String, required: true },
    severity: { type: String, required: true },
    type: { type: String, required: true },
    status: { type: String, default: "new" },
    assignedTo: { type: mongoose.Schema.ObjectId },
    resolvedOn: { type: Date },
    dateCreated: { type: Date, default: Date.now },
  },
  { timestamps: true, collection: "supportTickets" }
);

const SupportTicket = mongoose.model("SupportTicket", schema);

module.exports = SupportTicket;
