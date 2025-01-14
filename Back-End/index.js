import express from "express";
import cors from "cors";
import {} from "dotenv/config";
import connectDB from "./config/db.js";
import router from "./routes/index.js";
import cookieParser from "cookie-parser";

const app = express();
app.use(
  cors({
    origin: process.env.FRONTEND_URL,
    credentials: true,
  })
);
app.use(express.json({ limit: "10mb" }));
// app.use(express.urlencoded({ limit: "10mb", extended: true }));

app.use(cookieParser());

app.use("/api", router);

const PORT = 8080 || process.env.PORT;

connectDB()
  .then(() => {
    app.listen(PORT, () => {
      console.log(`Server is running on port ${PORT}`);
    });
  })
  .catch((err) => {
    console.log("ERROR while connecting to DB ==> ", err);
  });
