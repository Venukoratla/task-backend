import { User } from "../Models/User.js";
import { Task } from "../Models/Task.js";

export const getAllUsersWithTasks = async (req, res) => {
  try {
    const users = await User.find().select("-password"); // Exclude password
    const data = await Promise.all(
      users.map(async (user) => {
        const tasks = await Task.find({ createdBy: user._id });
        return { ...user._doc, tasks };
      })
    );

    res.json({ success: true, data });
  } catch (error) {
    res.status(500).json({ message: "Failed to fetch users", error });
  }
};

// Delete any user (Admin only)
export const deleteUser = async (req, res) => {
  try {
    const { userId } = req.params;

    // Delete user
    await User.findByIdAndDelete(userId);

    // Delete all tasks associated with this user
    await Task.deleteMany({ createdBy: userId });

    res.json({ message: "User and their tasks deleted successfully" });
  } catch (error) {
    res.status(500).json({ message: "Failed to delete user", error });
  }
};

// Update any user details (Admin only)
export const updateUser = async (req, res) => {
  try {
    const { userId } = req.params;
    const updatedUser = await User.findByIdAndUpdate(userId, req.body, {
      new: true,
    }).select("-password");

    res.json(updatedUser);
  } catch (error) {
    res.status(500).json({ message: "Failed to update user", error });
  }
};

// Change user role (Admin only)
export const changeUserRole = async (req, res) => {
  try {
    const { userId } = req.params;
    const { role } = req.body;
    await User.findByIdAndUpdate(userId, { role });

    res.json({ message: "User role updated successfully" });
  } catch (error) {
    res.status(500).json({ message: "Failed to change user role", error });
  }
};

export const getUserTasks = async (req, res) => {
  try {
    const user = await User.findById(req.params.id);
    const tasks = await Task.find({ createdBy: req.params.id });

    if (!user) return res.status(404).json({ message: "User not found" });

    res.json({ user, tasks });
  } catch (error) {
    res.status(500).json({ message: "Server Error", error });
  }
};

export const updateTask = async (req, res) => {
  try {
    const { status, description } = req.body;
    console.log(status);
    const task = await Task.findByIdAndUpdate(
      req.params.taskId,
      { priority: status, description },
      { new: true }
    );

    if (!task) return res.status(404).json({ message: "Task not found" });

    res.json({ message: "Task updated successfully", task });
  } catch (error) {
    res.status(500).json({ message: "Server Error", error });
  }
};
