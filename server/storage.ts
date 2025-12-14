import { users, tweets, type User, type InsertUser, type Tweet, type InsertTweet } from "@shared/schema";
import { db } from "./db";
import { eq, desc } from "drizzle-orm";

export interface IStorage {
  getUser(id: string): Promise<User | undefined>;
  getUserByUsername(username: string): Promise<User | undefined>;
  createUser(user: InsertUser): Promise<User>;
  createTweet(tweet: InsertTweet): Promise<Tweet>;
  getTweets(limit?: number): Promise<Tweet[]>;
  getTweet(id: string): Promise<Tweet | undefined>;
  deleteTweet(id: string): Promise<boolean>;
}

export class DatabaseStorage implements IStorage {
  async getUser(id: string): Promise<User | undefined> {
    const [user] = await db.select().from(users).where(eq(users.id, id));
    return user || undefined;
  }

  async getUserByUsername(username: string): Promise<User | undefined> {
    const [user] = await db.select().from(users).where(eq(users.username, username));
    return user || undefined;
  }

  async createUser(insertUser: InsertUser): Promise<User> {
    const [user] = await db
      .insert(users)
      .values(insertUser)
      .returning();
    return user;
  }

  async createTweet(insertTweet: InsertTweet): Promise<Tweet> {
    const [tweet] = await db
      .insert(tweets)
      .values(insertTweet)
      .returning();
    return tweet;
  }

  async getTweets(limit: number = 50): Promise<Tweet[]> {
    return await db
      .select()
      .from(tweets)
      .orderBy(desc(tweets.createdAt))
      .limit(limit);
  }

  async getTweet(id: string): Promise<Tweet | undefined> {
    const [tweet] = await db.select().from(tweets).where(eq(tweets.id, id));
    return tweet || undefined;
  }

  async deleteTweet(id: string): Promise<boolean> {
    const result = await db.delete(tweets).where(eq(tweets.id, id)).returning();
    return result.length > 0;
  }
}

export const storage = new DatabaseStorage();
