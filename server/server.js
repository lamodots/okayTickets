import "dotenv/config";
import express from "express";
import path from "path";
import {fileURLToPath} from 'url';
import colors from "colors";
import userRouter from "./routes/userRoutes.js";
import ticketRouter from "./routes/ticketRoutes.js";
import { errorHandler } from "./middlewares/errorMiddleware.js";
import connectDB from "./config/db.js";

// connect to database

connectDB();

const PORT = process.env.PORT || 5000;
const app = express();
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use("/api/users", userRouter);
app.use("/api/tickets", ticketRouter);
app.use(errorHandler);


// Getting the __dirname the ES Module method
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);


// Serve front end

if (process.env.NODE_ENV === "production") {
  // set build folder as static
  app.use(express.static(path.join(__dirname, "../client/build")));

  app.get("*", (req, res) =>
    res.sendFile(path.join(__dirname, "../", "client", "build", "index.html"))
  );
} else {
  app.get("/", (req, res) => {
    // respond with "Welcome...." when a GET request is made to the homepage
    res.status(200).json({ message: "Welcome to Support Desk App" });
  });
}

app.listen(PORT, () => {
  return console.log(`Server listening on port ${PORT}`);
});
