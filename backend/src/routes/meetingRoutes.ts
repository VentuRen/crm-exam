import { Router } from "express";
import { createMeeting, getMeetings, getMeetingById, updateMeeting, deleteMeeting } from "../controllers/meetingController";
import { authMiddleware } from "../middleware/authMiddleware";

const router = Router();

router.post("/", authMiddleware, createMeeting);
router.get("/", authMiddleware, getMeetings);
router.get("/:id", authMiddleware, getMeetingById);
router.put("/:id", authMiddleware, updateMeeting);
router.delete("/:id", authMiddleware, deleteMeeting);

export default router;
