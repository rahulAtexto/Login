// server.js
import express from "express";
import cors from "cors";
import userRoutes from "./routes/Userrouter.js";

const app = express();
app.use(cors());
app.use(express.json());

// User routes
app.use("/users", userRoutes);

app.listen(5000, () => {
  console.log("🚀 Server running on http://localhost:5000");
});
