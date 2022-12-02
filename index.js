import http from "http";
import express from "express";
import mongoose from "mongoose";
import userRouter from "./routes/user.js";
import dashboardRouter from "./routes/dashboard.js";
import {loginrequired} from "./middleware/jwt.js"

const app = express();

const port = "8000";

app.use(express.json());
app.use(express.urlencoded({ extended: false }));

app.use("/dashboard",loginrequired ,dashboardRouter)
app.use("/user",userRouter)
app.use("*", (req, res) => {
  return res.status(404).json({
    success: false,
    message: "API endpoint doesnt exist",
  });
});

mongoose
  .connect("mongodb://localhost:27017/", {
    
  })
  .then(console.log("Connected to MongoDB now"))
  .catch((err) => console.log(err));

const server = http.createServer(app);

server.listen(port);
/** Event listener for HTTP server "listening" event. */
server.on("listening", () => {
  console.log(`Listening on port:: http://localhost:${port}/`);
});
