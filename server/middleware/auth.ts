import { Request, Response, NextFunction } from "express";
import { storage } from "../storage";

export async function requireAuth(req: Request, res: Response, next: NextFunction) {
  const userId = req.session?.userId;
  if (!userId) {
    return res.status(401).json({ error: "Not authenticated" });
  }

  const user = await storage.getUser(userId);
  if (!user) {
    return res.status(401).json({ error: "User not found" });
  }

  req.user = user;
  next();
}

export async function requireAdmin(req: Request, res: Response, next: NextFunction) {
  const userId = req.session?.userId;
  if (!userId) {
    return res.status(401).json({ error: "Not authenticated" });
  }

  const user = await storage.getUser(userId);
  if (!user || user.role !== "admin") {
    return res.status(403).json({ error: "Not authorized" });
  }

  req.user = user;
  next();
}
