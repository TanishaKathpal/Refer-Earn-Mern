const express = require("express");
const router = express.Router();
const User = require("../models/User");
const Config = require("../models/Config");

// Function to generate referral code
function generateReferralCode() {
  return Math.random().toString(36).substring(2, 8).toUpperCase();
}

// POST /register
router.post("/register", async (req, res) => {
  try {
    const { name, email, password } = req.body;

    // Check if user already exists
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(400).json({ message: "User already exists!" });
    }

    const referralCode = generateReferralCode();

    const newUser = new User({
      name,
      email,
      password,
      referralCode,
      coins: 0
    });

    await newUser.save();
    res.json({ message: "User registered", user: newUser });

  } catch (error) {
    res.status(500).json({ message: "Server error", error });
  }
});

module.exports = router;


// POST /apply-referral
router.post("/apply-referral", async (req, res) => {
  try {
    const { userId, referralCode } = req.body;

    // Find the user who is applying the code
    const user = await User.findById(userId);
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    // Check if they are trying to use their own referral code
    if (user.referralCode === referralCode) {
      return res.status(400).json({ message: "You cannot use your own referral code!" });
    }

    // Find the owner of the referral code
    const referredUser = await User.findOne({ referralCode });
    if (!referredUser) {
      return res.status(400).json({ message: "Invalid referral code!" });
    }

    // Get rewardCoins from config collection
    const config = await Config.findOne({});
    const reward = config.rewardCoins;

    // Add coins to the user
    user.coins += reward;
    await user.save();

    res.json({
      message: "Referral applied successfully!",
      coinsAdded: reward,
      newCoins: user.coins
    });

  } catch (error) {
    res.status(500).json({ message: "Server error", error });
  }
});
