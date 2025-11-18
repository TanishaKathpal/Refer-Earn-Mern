const mongoose = require("mongoose");

const configSchema = new mongoose.Schema({
  rewardCoins: Number
});

module.exports = mongoose.model("Config", configSchema);
