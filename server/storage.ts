import {
  users, blogPosts, contacts, newsletters,
  type User, type InsertUser,
  type BlogPost, type InsertBlogPost,
  type Contact, type InsertContact,
  type Newsletter, type InsertNewsletter
} from "@shared/schema";
import { db } from "./db";
import { eq, desc } from "drizzle-orm";

export interface IStorage {
  // Users
  getUser(id: number): Promise<User | undefined>;
  getUserByUsername(username: string): Promise<User | undefined>;
  createUser(user: InsertUser): Promise<User>;

  // Blog Posts
  getBlogPosts(): Promise<BlogPost[]>;
  getBlogPost(id: number): Promise<BlogPost | undefined>;
  createBlogPost(post: InsertBlogPost): Promise<BlogPost>;
  updateBlogPostStatus(id: number, status: string): Promise<BlogPost>;
  getPublishedBlogPosts(): Promise<BlogPost[]>;

  // Contacts
  createContact(contact: InsertContact): Promise<Contact>;
  getContacts(): Promise<Contact[]>;

  // Newsletter
  createNewsletter(newsletter: InsertNewsletter): Promise<Newsletter>;
  getNewsletterByEmail(email: string): Promise<Newsletter | undefined>;
}

export class MemStorage implements IStorage {
  private users: Map<number, User>;
  private blogPosts: Map<number, BlogPost>;
  private contacts: Map<number, Contact>;
  private newsletters: Map<number, Newsletter>;
  private currentId: number;

  constructor() {
    this.users = new Map();
    this.blogPosts = new Map();
    this.contacts = new Map();
    this.newsletters = new Map();
    this.currentId = 1;
  }

  // Users
  async getUser(id: number): Promise<User | undefined> {
    return this.users.get(id);
  }

  async getUserByUsername(username: string): Promise<User | undefined> {
    return Array.from(this.users.values()).find(
      (user) => user.username === username,
    );
  }

  async createUser(insertUser: InsertUser): Promise<User> {
    const id = this.currentId++;
    const user: User = {
      ...insertUser,
      id,
      role: insertUser.role ?? "user",
      createdAt: new Date()
    };
    this.users.set(id, user);
    return user;
  }

  // Blog Posts
  async getBlogPosts(): Promise<BlogPost[]> {
    return Array.from(this.blogPosts.values()).sort((a, b) => {
      const dateA = a.createdAt ? new Date(a.createdAt).getTime() : 0;
      const dateB = b.createdAt ? new Date(b.createdAt).getTime() : 0;
      return dateB - dateA;
    });
  }

  async getBlogPost(id: number): Promise<BlogPost | undefined> {
    return this.blogPosts.get(id);
  }

  async createBlogPost(post: InsertBlogPost): Promise<BlogPost> {
    const id = this.currentId++;
    const blogPost: BlogPost = {
      ...post,
      id,
      featuredImage: post.featuredImage ?? null,
      seoTitle: post.seoTitle ?? null,
      seoDescription: post.seoDescription ?? null,
      seoKeywords: post.seoKeywords ?? null,
      tags: post.tags ?? null,
      createdAt: new Date(),
      updatedAt: new Date(),
      publishedAt: post.status === 'published' ? new Date() : null,
      status: post.status ?? 'draft'
    };
    this.blogPosts.set(id, blogPost);
    return blogPost;
  }

  async updateBlogPostStatus(id: number, status: string): Promise<BlogPost> {
    const post = this.blogPosts.get(id);
    if (!post) throw new Error("Post not found");
    const updated = {
      ...post,
      status,
      publishedAt: status === 'published' ? new Date() : null
    };
    this.blogPosts.set(id, updated);
    return updated;
  }

  async getPublishedBlogPosts(): Promise<BlogPost[]> {
    return Array.from(this.blogPosts.values())
      .filter(post => post.status === 'published')
      .sort((a, b) => {
        const dateA = a.publishedAt ? new Date(a.publishedAt).getTime() : 0;
        const dateB = b.publishedAt ? new Date(b.publishedAt).getTime() : 0;
        return dateB - dateA;
      });
  }

  // Contacts
  async createContact(contact: InsertContact): Promise<Contact> {
    const id = this.currentId++;
    const newContact: Contact = { ...contact, id, createdAt: new Date() };
    this.contacts.set(id, newContact);
    return newContact;
  }

  async getContacts(): Promise<Contact[]> {
    return Array.from(this.contacts.values()).sort((a, b) => {
      const dateA = a.createdAt ? new Date(a.createdAt).getTime() : 0;
      const dateB = b.createdAt ? new Date(b.createdAt).getTime() : 0;
      return dateB - dateA;
    });
  }

  // Newsletter
  async createNewsletter(newsletter: InsertNewsletter): Promise<Newsletter> {
    const id = this.currentId++;
    const newNewsletter: Newsletter = { ...newsletter, id, createdAt: new Date() };
    this.newsletters.set(id, newNewsletter);
    return newNewsletter;
  }

  async getNewsletterByEmail(email: string): Promise<Newsletter | undefined> {
    return Array.from(this.newsletters.values()).find(
      (n) => n.email === email
    );
  }
}

export class DatabaseStorage implements IStorage {
  // Users
  async getUser(id: number): Promise<User | undefined> {
    // @ts-ignore
    const [user] = await db.select().from(users).where(eq(users.id, id));
    return user;
  }

  async getUserByUsername(username: string): Promise<User | undefined> {
    // @ts-ignore
    const [user] = await db.select().from(users).where(eq(users.username, username));
    return user;
  }

  async createUser(insertUser: InsertUser): Promise<User> {
    // @ts-ignore
    const [user] = await db.insert(users).values(insertUser).returning();
    return user;
  }

  // Blog Posts
  async getBlogPosts(): Promise<BlogPost[]> {
    // @ts-ignore
    return db.select().from(blogPosts).orderBy(desc(blogPosts.createdAt));
  }

  async getBlogPost(id: number): Promise<BlogPost | undefined> {
    // @ts-ignore
    const [post] = await db.select().from(blogPosts).where(eq(blogPosts.id, id));
    return post;
  }

  async createBlogPost(post: InsertBlogPost): Promise<BlogPost> {
    // @ts-ignore
    const [blogPost] = await db.insert(blogPosts).values(post).returning();
    return blogPost;
  }

  async updateBlogPostStatus(id: number, status: string): Promise<BlogPost> {
    // @ts-ignore
    const [blogPost] = await db
      .update(blogPosts)
      .set({
        status,
        publishedAt: status === 'published' ? new Date() : null
      })
      .where(eq(blogPosts.id, id))
      .returning();
    return blogPost;
  }

  async getPublishedBlogPosts(): Promise<BlogPost[]> {
    // @ts-ignore
    return db
      .select()
      .from(blogPosts)
      .where(eq(blogPosts.status, 'published'))
      .orderBy(desc(blogPosts.publishedAt));
  }

  // Contacts
  async createContact(contact: InsertContact): Promise<Contact> {
    // @ts-ignore
    const [newContact] = await db.insert(contacts).values(contact).returning();
    return newContact;
  }

  async getContacts(): Promise<Contact[]> {
    // @ts-ignore
    return db.select().from(contacts).orderBy(desc(contacts.createdAt));
  }

  // Newsletter
  async createNewsletter(newsletter: InsertNewsletter): Promise<Newsletter> {
    // @ts-ignore
    const [newNewsletter] = await db.insert(newsletters).values(newsletter).returning();
    return newNewsletter;
  }

  async getNewsletterByEmail(email: string): Promise<Newsletter | undefined> {
    // @ts-ignore
    const [newsletter] = await db.select().from(newsletters).where(eq(newsletters.email, email));
    return newsletter;
  }
}

export const storage = process.env.DATABASE_URL ? new DatabaseStorage() : new MemStorage();