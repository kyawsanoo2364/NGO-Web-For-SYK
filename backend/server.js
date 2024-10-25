import express from "express";
import dotenv from "dotenv";
import connectToDB from "./db/connectToDB.js";
import activityRoutes from "./routers/activity.routes.js";
import authRoutes from "./routers/auth.routes.js";
import cookieParser from "cookie-parser";
import homeRoutes from "./routers/home.routes.js";
import protectRoute from "./middleware/protectRoute.js";
import courseRoutes from "./routers/course.routes.js";
import eduProjectRoutes from "./routers/EduProject.routes.js";
import userRoutes from "./routers/user.routes.js";
import eventRoutes from "./routers/event.routes.js";
import cors from "cors";

dotenv.config();
const app = express();
app.use(
  cors({
    origin: "http://localhost:5173",
    methods: ["GET", "POST", "PATCH", "DELETE"],
    credentials: true,
  })
);
app.use(express.json());

app.use(cookieParser());
app.use("/api/auth", authRoutes);
app.use("/api/blogs", activityRoutes); //protect and admin only
app.use("/api/home", homeRoutes);
app.use("/api/courses", courseRoutes);
app.use("/api/edu-projects", eduProjectRoutes); //protect and admin only
app.use("/api/users", protectRoute, userRoutes);
app.use("/api/events", eventRoutes); //protect and admin only

app.listen(process.env.PORT, () => {
  connectToDB();
  console.log(`Server is running on port ${process.env.PORT}`);
});
