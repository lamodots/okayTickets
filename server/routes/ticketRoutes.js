import express from "express";
import {
  createTicket,
  getTickets,
  getTicket,
  updateTicket,
  deleteTicket,
} from "../controllers/ticketController.js";
import { protect } from "../middlewares/authMiddleware.js";
import noteRouter from "./noteRoutes.js";

// Re-route into NoteRouter once a request hits this endpoint.
// It is done here instead of the server.js because part of the route path is the ticketRoute
const router = express.Router();
router.use("/:ticketId/notes", noteRouter);

router.route("/").get(protect, getTickets).post(protect, createTicket);

router
  .route("/:id")
  .get(protect, getTicket)
  .put(protect, updateTicket)
  .delete(protect, deleteTicket);

export default router;
