import { pgTable, text, serial, integer, timestamp, json } from "drizzle-orm/pg-core";
import { createInsertSchema } from "drizzle-zod";
import { z } from "zod";

export const users = pgTable("users", {
  id: serial("id").primaryKey(),
  username: text("username").notNull().unique(),
  password: text("password").notNull(),
  role: text("role").notNull().default("user"),
  createdAt: timestamp("created_at").defaultNow().notNull()
});

export const blogPosts = pgTable("blog_posts", {
  id: serial("id").primaryKey(),
  title: text("title").notNull(),
  slug: text("slug").notNull().unique(),
  content: text("content").notNull(),
  description: text("description").notNull(),
  featuredImage: text("featured_image"),
  category: text("category").notNull(),
  tags: text("tags").array(),
  author: text("author").notNull(),
  seoTitle: text("seo_title"),
  seoDescription: text("seo_description"),
  seoKeywords: text("seo_keywords").array(),
  status: text("status").notNull().default("draft"),
  publishedAt: timestamp("published_at"),
  createdAt: timestamp("created_at").defaultNow().notNull(),
  updatedAt: timestamp("updated_at").defaultNow().notNull()
});

export const contacts = pgTable("contacts", {
  id: serial("id").primaryKey(),
  name: text("name").notNull(),
  email: text("email").notNull(),
  interestArea: text("interest_area").notNull(),
  message: text("message").notNull(),
  createdAt: timestamp("created_at").defaultNow().notNull()
});

export const newsletters = pgTable("newsletters", {
  id: serial("id").primaryKey(),
  name: text("name").notNull(),
  email: text("email").notNull().unique(),
  createdAt: timestamp("created_at").defaultNow().notNull()
});

// Schemas with validation
export const insertUserSchema = createInsertSchema(users).extend({
  password: z.string().min(8, "Password must be at least 8 characters"),
  confirmPassword: z.string()
}).refine((data) => data.password === data.confirmPassword, {
  message: "Passwords don't match",
  path: ["confirmPassword"]
});

export const insertBlogPostSchema = createInsertSchema(blogPosts).extend({
  title: z.string().min(10, "Title must be at least 10 characters"),
  content: z.string().min(100, "Content must be at least 100 characters"),
  description: z.string().min(50, "Description must be at least 50 characters"),
  seoTitle: z.string().min(30, "SEO title must be at least 30 characters").optional(),
  seoDescription: z.string().min(50, "SEO description must be at least 50 characters").optional(),
  seoKeywords: z.array(z.string()).min(3, "Add at least 3 SEO keywords").optional()
});

export const insertContactSchema = createInsertSchema(contacts).extend({
  bot_field: z.string().optional(),
  token: z.string().optional() // Cloudflare Turnstile Token
});
export const insertNewsletterSchema = createInsertSchema(newsletters).extend({
  bot_field: z.string().optional(), // Honeypot field
  token: z.string().optional() // Cloudflare Turnstile Token
});

// Types
export type User = typeof users.$inferSelect;
export type BlogPost = typeof blogPosts.$inferSelect;
export type Contact = typeof contacts.$inferSelect;
export type Newsletter = typeof newsletters.$inferSelect;

export type InsertUser = z.infer<typeof insertUserSchema>;
export type InsertBlogPost = z.infer<typeof insertBlogPostSchema>;
export type InsertContact = z.infer<typeof insertContactSchema>;
export type InsertNewsletter = z.infer<typeof insertNewsletterSchema>;