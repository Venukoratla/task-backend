import { Task } from "../Models/Task.js";

// Create Task
export const createTask = async (req, res) => {
  try {
    const task = new Task({ ...req.body, createdBy: req.user.id });
    await task.save();
    res.status(201).json({ success: true, task });
  } catch (error) {
    res
      .status(500)
      .json({ success: false, message: "Failed to create task", error });
  }
};

// Get User Tasks
export const getUserTasks = async (req, res) => {
  try {
    const tasks = await Task.find({ createdBy: req.user.id });
    res.status(201).json({ success: true, tasks });
  } catch (error) {
    res.status(500).json({ message: "Failed to get tasks", error });
  }
};

// Update Task
export const updateTask = async (req, res) => {
  try {
    const task = await Task.findOneAndUpdate(
      { _id: req.params.id, createdBy: req.user.id },
      req.body,
      { new: true }
    );
    res.status(201).json({ success: true, task });
  } catch (error) {
    res.status(500).json({ message: "Failed to update task", error });
  }
};

// Delete Task
export const deleteTask = async (req, res) => {
  try {
    await Task.findOneAndDelete({ _id: req.params.id });
    res.status(201).json({ success: true, message: "Task Deleted" });
  } catch (error) {
    res.status(500).json({ message: "Failed to delete task", error });
  }
};
