import express from "express";
import {
  getMessages,
  // getUsersForSidebar,
  sendMessage,
} from "../controllers/message.controller.js";
import { authenticateToken } from "../lib/utils.js";

const router = express.Router();

// router.get("/users", authenticateToken, getUsersForSidebar);
router.get("/:id", authenticateToken, getMessages);

router.post("/send/:id", authenticateToken, sendMessage);

export default router;
