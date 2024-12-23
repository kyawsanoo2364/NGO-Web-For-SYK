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
import headerRoutes from "./routers/header.routes.js";
import bodyParser from "body-parser";
import cors from "cors";
import staffRoutes from "./routers/staff.routes.js";
import partnershipRoutes from "./routers/partnership.routes.js";
import privacyRoutes from "./routers/privacy.routes.js";
import path from "path";
import webpush from "web-push";

dotenv.config();
const app = express();
app.use(
  cors({
    origin:
      process.env.NODE_ENV === "development" ? "http://localhost:5173" : true,

    methods: ["GET", "POST", "PATCH", "DELETE"],
    credentials: true,
  })
);
app.use(bodyParser.json({ limit: "5mb" })); // Set JSON body size limit
app.use(express.urlencoded({ limit: "5mb", extended: true })); // Set URL-encoded body size limit
app.use(bodyParser.urlencoded({ extended: false }));

const __dirname = path.resolve();

app.use(cookieParser());
app.use("/api/auth", authRoutes);
app.use("/api/blogs", activityRoutes); //protect and admin only
app.use("/api/home", homeRoutes);
app.use("/api/header", headerRoutes); // Get Company Name and Logo
app.use("/api/courses", courseRoutes);
app.use("/api/edu-projects", eduProjectRoutes); //protect and admin only
app.use("/api/users", protectRoute, userRoutes);
app.use("/api/events", eventRoutes); //protect and admin only
app.use("/api/staffs", staffRoutes);
app.use("/api/partnerships", partnershipRoutes);
app.use("/api/privacyPolicy", privacyRoutes);

if (process.env.NODE_ENV === "production") {
  app.use(express.static(path.join(__dirname, "frontend/dist")));
  app.use("*", (req, res) => {
    res.sendFile(path.resolve(__dirname, "frontend", "dist", "index.html"));
  });
}

webpush.setVapidDetails(
  "mailto:skyaw6736@gmail.com",
  process.env.REACT_APP_WebPushPublicKey,
  process.env.REACT_APP_WebPushPrivateKey
);

app.post("/api/subscribe", (req, res) => {
  const { subscription, payload } = req.body;

  res.status(201).json({});

  webpush
    .sendNotification(subscription, JSON.stringify(payload))
    .catch((err) => console.log(err.message));
});

app.listen(process.env.PORT, () => {
  connectToDB();
  console.log(`Server is running on port ${process.env.PORT}`);
});
