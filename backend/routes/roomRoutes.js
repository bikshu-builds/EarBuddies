import express from "express";
import protect from "../middleware/authmiddleware.js";
import { createRoom, joinRoom, getRoom } from "../controllers/roomController.js";

const router = express.Router();

router.post("/create", protect, createRoom);
router.post("/join", protect, joinRoom);
router.get("/:code", protect, getRoom);

export default router;
