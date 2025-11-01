import express from "express";
import cors from "cors";

const app = express();

// Enable CORS for all routes
app.use(cors({
  origin: "*", // Allow all origins for development
  methods: ["GET", "POST", "PUT", "DELETE"],
  allowedHeaders: ["Content-Type", "Authorization"]
}));

app.use(express.json());
export default app;
