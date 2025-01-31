import { Request, Response, NextFunction } from "express";
import jwt from "jsonwebtoken";

const SECRET_KEY = process.env.JWT_SECRET || "supersecretkey"; // Clave secreta

export interface AuthRequest extends Request {
  user?: { id: number; email: string; role: string };
}

export const authMiddleware = (req: AuthRequest, res: Response, next: NextFunction): void => {
  const token = req.header("Authorization")?.split(" ")[1];

  if (!token) {
    res.status(401).json({ error: "Unauthorized: No token provided" });
    return; // 🔹 IMPORTANTE: Retornar para evitar que `next()` se ejecute
  }

  try {
    const decoded = jwt.verify(token, SECRET_KEY) as { id: number; email: string; role: string };
    req.user = decoded;
    next(); // 🔹 IMPORTANTE: Llamar `next()` solo si el token es válido
  } catch (error) {
    res.status(401).json({ error: "Unauthorized: Invalid token" });
    return;
  }
};
