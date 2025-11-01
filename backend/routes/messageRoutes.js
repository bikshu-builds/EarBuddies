import express from "express";
import protect from "../middleware/authmiddleware.js";
import { sendMessage, getMessages } from "../controllers/messageController.js";

const router = express.Router();

router.post("/send", protect, sendMessage);
router.get("/:code", protect, getMessages);

export default router;
