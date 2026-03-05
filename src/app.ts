import express from "express";
import cors from "cors";

const app = express();
const PORT = process.env.PORT || 3001;

app.use(cors());
app.use(express.json());

// Health check
app.get("/api/health", (req, res) => {
  res.json({ status: "OK", message: "Booking API is running" });
});

// Routes

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
