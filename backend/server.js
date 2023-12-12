import mongoose from "mongoose";
import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import userRoute from "./routes/userRoute.js";
import emailRoute from "./routes/emailRoute.js";

const app = express();
const port = process.env.PORT || 3009;

app.use(express.json());
const corsOptions = {
  origin: "https://react-book-manager-frontend-ievazrs-projects.vercel.app",
  methods: "GET,HEAD,PUT,PATCH,POST,DELETE",
  credentials: true,
  optionsSuccessStatus: 200 // some legacy browsers (IE11, various SmartTVs) choke on 204
};

app.use(cors(corsOptions));

dotenv.config();

const connectionToDB = async () => {
  try {
    await mongoose.connect(process.env.MONGODB_URL + "BookManager");
    console.log("Connection to DB is successful");
  } catch (error) {
    console.log(error);
  }
};

app.use("/user", userRoute);
app.use("/email", emailRoute);

app.listen(port, () => {
  connectionToDB();
  console.log(`Server started on port: ${port}`);
});

