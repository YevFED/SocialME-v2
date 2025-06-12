import express from "express";
import {
  getUser,
  editUser,
  searchUser,
  UploadPhoto,
} from "../controllers/user.controller.js";

import { authenticateToken } from "../lib/utils.js";

const router = express.Router();

router.get("/getuser", authenticateToken, getUser);
router.post("/search", authenticateToken, searchUser);
router.put("/updateuser", authenticateToken, editUser);
router.post("/upload", authenticateToken, UploadPhoto);

export default router;
