const mongoose = require("mongoose");

const schema = new mongoose.Schema(
  {
    name: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    phone: { type: String, required: true },
    description: { type: String, required: true },
    active: { type: Boolean, default: true },
    dateCreated: { type: Date, default: Date.now },
  },
  { timestamps: true, collection: "supportAgents" }
);

const SupportAgent = mongoose.model("SupportAgent", schema);

module.exports = SupportAgent;
