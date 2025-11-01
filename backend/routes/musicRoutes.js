// routes/musicRoutes.js
import express from "express";
import { getSongs } from "../controllers/musicController.js";

const router = express.Router();

// GET /api/music/songs?term=telugu
router.get("/songs", getSongs);

export default router;
