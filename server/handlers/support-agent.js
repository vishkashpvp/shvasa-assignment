const createHttpError = require("http-errors");
const SupportAgent = require("../models/support-agent");

async function createSupportAgent(req, res, next) {
  try {
    const { name, email, phone, description } = req.body;
    const agent = await SupportAgent.create({ name, email, phone, description });
    res.status(201).json(agent);
  } catch (err) {
    if (err.code == 11000) {
      return next(createHttpError.BadRequest(`Account exists with email '${req.body.email}'`));
    }
    return next(err);
  }
}

module.exports = {
  createSupportAgent,
};
