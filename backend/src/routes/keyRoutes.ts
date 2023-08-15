import express from "express";

export const keyRoutes = express.Router();

keyRoutes.get("/paypal", (req, res) => {
  res.json({ clientID: process.env.paypal_client_id || "sb" });
});
