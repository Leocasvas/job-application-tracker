import "dotenv/config";
import express from "express";
import cors from "cors";
import mongoose from "mongoose";
import passport from "./config/passport.js";
import authRoutes from "./routes/auth.js";
import jobRoutes from "./routes/jobs.js";

const app = express();
// Browser requests send only an origin (scheme + host), while OAuth redirects
// need the full frontend URL, including the GitHub Pages repository path.
app.use(
  cors({
    origin: process.env.CLIENT_ORIGIN || process.env.CLIENT_URL,
    credentials: true,
  }),
);
app.use(express.json());
app.use(passport.initialize());
app.get("/", (_req, res) =>
  res.json({ service: "JobFlow API", health: "/api/health" }),
);
app.get("/api/health", (_req, res) => res.json({ status: "ok" }));
app.use("/api/auth", authRoutes);
app.use("/api/jobs", jobRoutes);
app.use((error, _req, res, _next) => {
  // Keep the response safe for users while writing the diagnostic details to
  // the server logs where they can be inspected during deployment.
  console.error("Unhandled request error:", error);
  if (error.name === "ValidationError")
    return res.status(400).json({ message: error.message });
  res.status(500).json({ message: "Something went wrong." });
});

const port = process.env.PORT || 5000;
mongoose
  .connect(process.env.MONGODB_URI)
  .then(() =>
    app.listen(port, () => console.log(`API listening on port ${port}`)),
  )
  .catch((error) => {
    console.error("MongoDB connection failed:", error.message);
    process.exit(1);
  });
