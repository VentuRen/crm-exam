import { Router } from "express";
import { createContact, getContacts, getContactById, updateContact, deleteContact } from "../controllers/contactController";
import { authMiddleware } from "../middleware/authMiddleware";

const router = Router();

router.post("/", authMiddleware, createContact);
router.get("/", authMiddleware, getContacts);
router.get("/:id", authMiddleware, getContactById);
router.put("/:id", authMiddleware, updateContact);
router.delete("/:id", authMiddleware, deleteContact);

export default router;
