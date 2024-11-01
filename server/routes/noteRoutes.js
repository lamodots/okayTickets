import express from "express";
import { protect } from "../middlewares/authMiddleware.js";
import { getNotes, addNotes } from "../controllers/noteController.js";
const router = express.Router({mergeParams: true});

router.route("/").get(protect, getNotes).post(protect, addNotes);

export default router;