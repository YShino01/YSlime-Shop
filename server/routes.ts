import type { Express } from "express";
import { createServer, type Server } from "http";
import { storage } from "./storage";

export async function registerRoutes(app: Express): Promise<Server> {
  app.get("/api/products", async (_req, res) => {
    try {
      const productData = await storage.getProductData();
      res.json(productData);
    } catch (error) {
      console.error("Error fetching product data:", error);
      res.status(500).json({ error: "Failed to fetch product data" });
    }
  });

  const httpServer = createServer(app);

  return httpServer;
}
