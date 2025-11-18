const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");

const app = express();
app.use(express.json());
app.use(cors());

const authRoutes = require("./routes/authRoutes");
app.use("/api", authRoutes);


// MongoDB Connection
mongoose
  .connect("mongodb://127.0.0.1:27017/referEarnDB")
  .then(() => console.log("MongoDB Connected"))
  .catch((err) => console.log(err));

// Default route
app.get("/", (req, res) => {
  res.send("Server is running!");
});

// Start Server
app.listen(5000, () => {
  console.log("Server started on port 5000");
});
