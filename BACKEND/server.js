import express from "express";
import mongoose from "mongoose";
//import bodyparser from "body-parser";
import cors from "cors";
import dotenv from "dotenv";
const app = express();
dotenv.config();

import student_router from "./routes/student_route.js";

const PORT = process.env.PORT || 4440;
const URI = process.env.MONGODB_URI;

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
//app.use(bodyparser.json());

/*
mongoose.connect("mongodb://localhost:27017/student_db", {
  useNewUrlParser: true,
  useUnifiedTopology: true,
  // useCreateIndex: true, // Use this option for creating indexes
  //useFindAndModify: false, // Set to false to disable findAndModify
});
*/

mongoose.connect(URI, {
  // useCreateIndex: true,
  useNewUrlParser: true,
  useUnifiedTopology: true,
  // useFindAndModify: false,
});

const connection = mongoose.connection;

connection.once("open", () => {
  console.log("Mongodb Connection successfully!");
});

// routes
app.use("/student", student_router);

app.listen(PORT, () => {
  console.log(`Server is up and running on port : ${PORT}`);
});
