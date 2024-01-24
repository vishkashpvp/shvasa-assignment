require("dotenv").config();

const express = require("express");
const cors = require("cors");
const config = require("./config/config");
const { connectToMongoDB } = require("./db/mongo");

const PORT = config.PORT;
const app = express();

app.use(cors());
app.options(cors());
app.use(express.json());

// Connects to MongoDB
connectToMongoDB()
  .then(() => console.log("Connected to MongoDB"))
  .catch((e) => console.log("Error while connecting to MongoDB ", e));

// ping-pong endpoint
app.get("/api/ping", (req, res) => res.send("pong"));

// SupportAgent Endpoints
app.use("/api", require("./routes/support-agent"));

// SupportTicket Endpoints
app.use("/api", require("./routes/support-ticket"));

// Global error handling
app.use((err, req, res, next) => {
  const statusCode = err.statusCode || 500;
  res.status(statusCode).json({ status: "error", message: err.message });
});

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
