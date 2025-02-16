const express = require("express");
const router = express.Router();
const Poll = require("../models/Poll");

router.post("/", async (req, res) => {
  try {
    const { question, options } = req.body;
    const poll = new Poll({
      question,
      options: options.map((opt) => ({ text: opt, votes: 0 })),
    });
    await poll.save();

    req.io.emit("pollsUpdated", poll);
    res.status(201).json(poll);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});

router.get("/", async (req, res) => {
  try {
    const polls = await Poll.find().sort({ createdAt: -1 });
    res.json(polls);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

router.post("/:id/vote", async (req, res) => {
  try {
    const { optionIndex } = req.body;
    const poll = await Poll.findById(req.params.id);

    if (!poll) {
      return res.status(404).json({ error: "Poll not found" });
    }

    poll.options[optionIndex].votes += 1;
    await poll.save();

    req.io.emit("pollsUpdated", poll);
    res.json(poll);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});

module.exports = router;