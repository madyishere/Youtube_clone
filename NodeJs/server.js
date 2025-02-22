import mongoose from "mongoose";
import express from "express";
import userRoutes from "./Routes/user.routes.js";
import cors from "cors";
import channelRoutes from "./Routes/channel.routes.js";
import videoRoutes from "./Routes/video.routes.js";

const app = express();

app.use(cors());
app.use(express.json());
app.listen(3000, () => {
  console.log("Server is running on port 3000");
});
mongoose.connect("mongodb+srv://madhavsharma4002:CdWzVrLuaMcGVzPW@cluster0.2segu.mongodb.net/youtube?retryWrites=true&w=majority&appName=Cluster0");

mongoose.set("debug", true);

const db = mongoose.connection;
db.on("open" , ()=>{
    console.log("Connected to database");
})

db.on("error", (error)=>{
    console.log("Error connecting to database", error);
});

userRoutes(app);
channelRoutes(app);
videoRoutes(app);

