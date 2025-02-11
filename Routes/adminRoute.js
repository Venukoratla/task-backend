import express from "express";
import {
  getAllUsersWithTasks,
  deleteUser,
  updateUser,
  changeUserRole,
  getUserTasks,
  updateTask,
} from "../controllers/adminController.js";
import { adminMiddleware } from "../middleware/auth.js";

const router = express.Router();

router.get("/users", adminMiddleware, getAllUsersWithTasks);
router.get("/users/:id", adminMiddleware, getUserTasks);
router.delete("/users/:userId", adminMiddleware, deleteUser);
router.put("/users/:userId", adminMiddleware, updateUser);
router.put("/update-task/:taskId", adminMiddleware, updateTask);
router.patch("/users/:userId/role", adminMiddleware, changeUserRole);

export default router;
