import { Router } from "express";
import { createClient, getClients, getClientById, updateClient, deleteClient } from "../controllers/clientController";
import { authMiddleware } from "../middleware/authMiddleware";

const router = Router();

router.post("/", authMiddleware, createClient);
router.get("/", authMiddleware, getClients);
router.get("/:id", authMiddleware, getClientById);
router.put("/:id", authMiddleware, updateClient);
router.delete("/:id", authMiddleware, deleteClient);

export default router;
