import type { Express } from "express";
import { createServer, type Server } from "http";
import { storage } from "./storage";

const LYZR_API_URL = "https://agent-prod.studio.lyzr.ai/v3/inference/chat/";

export async function registerRoutes(
  httpServer: Server,
  app: Express
): Promise<Server> {
  
  app.post("/api/generate", async (req, res) => {
    try {
      const { message, style } = req.body;

      if (!message || typeof message !== "string") {
        return res.status(400).json({
          success: false,
          error: "Message is required",
        });
      }

      const apiKey = process.env.LYZR_API_KEY;
      const userId = process.env.LYZR_USER_ID;
      const agentId = process.env.LYZR_AGENT_ID;
      const sessionId = process.env.LYZR_SESSION_ID;

      if (!apiKey || !userId || !agentId || !sessionId) {
        console.error("Missing Lyzr API configuration");
        return res.status(500).json({
          success: false,
          error: "Server configuration error. Please contact support.",
        });
      }

      const prompt = `Generate a viral, engaging tweet about: ${message}. 
Make it concise, impactful, and optimized for maximum engagement on Twitter/X. 
Keep it under 280 characters. Do not use hashtags unless absolutely necessary.
Just return the tweet text, nothing else.`;

      const response = await fetch(LYZR_API_URL, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "x-api-key": apiKey,
        },
        body: JSON.stringify({
          user_id: userId,
          agent_id: agentId,
          session_id: sessionId,
          message: prompt,
        }),
      });

      if (!response.ok) {
        const errorText = await response.text();
        console.error("Lyzr API error:", response.status, errorText);
        return res.status(500).json({
          success: false,
          error: "Failed to generate tweet. Please try again.",
        });
      }

      const data = await response.json();
      
      let tweet = "";
      if (data.response) {
        tweet = data.response;
      } else if (data.message) {
        tweet = data.message;
      } else if (data.text) {
        tweet = data.text;
      } else if (data.content) {
        tweet = data.content;
      } else if (data.result) {
        tweet = data.result;
      } else if (typeof data === "string") {
        tweet = data;
      } else {
        tweet = JSON.stringify(data);
      }

      tweet = tweet.trim();
      if (tweet.startsWith('"') && tweet.endsWith('"')) {
        tweet = tweet.slice(1, -1);
      }

      const savedTweet = await storage.createTweet({
        topic: message,
        content: tweet,
        style: style || "default",
      });

      return res.json({
        success: true,
        tweet,
        id: savedTweet.id,
      });
    } catch (error) {
      console.error("Error generating tweet:", error);
      return res.status(500).json({
        success: false,
        error: "An unexpected error occurred. Please try again.",
      });
    }
  });

  app.get("/api/tweets", async (req, res) => {
    try {
      const limit = parseInt(req.query.limit as string) || 50;
      const tweets = await storage.getTweets(limit);
      return res.json({ success: true, tweets });
    } catch (error) {
      console.error("Error fetching tweets:", error);
      return res.status(500).json({
        success: false,
        error: "Failed to fetch tweet history.",
      });
    }
  });

  app.delete("/api/tweets/:id", async (req, res) => {
    try {
      const { id } = req.params;
      const deleted = await storage.deleteTweet(id);
      if (deleted) {
        return res.json({ success: true });
      } else {
        return res.status(404).json({
          success: false,
          error: "Tweet not found.",
        });
      }
    } catch (error) {
      console.error("Error deleting tweet:", error);
      return res.status(500).json({
        success: false,
        error: "Failed to delete tweet.",
      });
    }
  });

  return httpServer;
}
