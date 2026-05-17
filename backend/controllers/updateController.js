const Update = require("../models/Update");
const Notification = require("../models/Notification");
const User = require("../models/User");

const getUpdates = async (req, res) => {
  try {
    const updates = await Update.find().populate("createdBy", "name").sort({ createdAt: -1 });
    res.json(updates);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

const addUpdate = async (req, res) => {
  try {
    const { title, description, category } = req.body;

    const update = await Update.create({
      title,
      description,
      category,
      createdBy: req.user._id,
    });

    const users = await User.find({ _id: { $ne: req.user._id } });
    const notifications = users.map((user) => ({
      userId: user._id,
      message: `New University Update: ${title}`,
      type: "Update",
    }));

    if (notifications.length > 0) {
      await Notification.insertMany(notifications);
    }

    res.status(201).json(update);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

const editUpdate = async (req, res) => {
  try {
    const update = await Update.findById(req.params.id);

    if (!update) {
      return res.status(404).json({ message: "Update not found" });
    }

    update.title = req.body.title || update.title;
    update.description = req.body.description || update.description;
    update.category = req.body.category || update.category;

    const updatedUpdate = await update.save();
    res.json(updatedUpdate);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

const deleteUpdate = async (req, res) => {
  try {
    const update = await Update.findById(req.params.id);

    if (!update) {
      return res.status(404).json({ message: "Update not found" });
    }

    await update.deleteOne();
    res.json({ message: "Update removed" });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

module.exports = { getUpdates, addUpdate, editUpdate, deleteUpdate };
