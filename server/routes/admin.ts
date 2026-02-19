import { Router } from "express";
import { storage } from "../storage";
import { requireAdmin } from "../middleware/auth";
import { insertBlogPostSchema } from "@shared/schema";
import { createSlug } from "../utils/slug";

const router = Router();

// Get all blog posts (including drafts)
router.get("/api/admin/posts", requireAdmin, async (req, res) => {
  try {
    const posts = await storage.getBlogPosts();
    res.json(posts);
  } catch (error) {
    res.status(500).json({ error: "Failed to fetch blog posts" });
  }
});

// Create or update blog post
router.post("/api/admin/posts", requireAdmin, async (req, res) => {
  try {
    const data = insertBlogPostSchema.parse(req.body);
    const slug = createSlug(data.title);
    
    const post = await storage.createBlogPost({
      ...data,
      slug,
      author: req.user.username
    });
    
    res.json(post);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});

// Toggle post status (draft/published)
router.patch("/api/admin/posts/:id/status", requireAdmin, async (req, res) => {
  try {
    const { id } = req.params;
    const { status } = req.body;
    
    const post = await storage.updateBlogPostStatus(parseInt(id), status);
    res.json(post);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});

export default router;
