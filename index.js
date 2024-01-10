import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import { dbConnection } from "./database/db.js";
import router from "./routes/userRoutes.js";

const app = express();

app.use(express.json());
app.use(cors());
dotenv.config();

app.use("/api/user", router);

const port = process.env.port || 9000;
dbConnection();
app.listen(port, (req, res) => {
  console.log(`server running on:  ${port}`);
});
