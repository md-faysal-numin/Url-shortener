const express = require("express");
const path = require("path");
const cookieParser = require("cookie-parser");
const URL = require("./models/url");
const { restrictedToOnlyLoggedUser,authOnly } = require("./middlewares/auth");
const app = express();
const PORT = 8001;

const { connectMongoDB } = require("./connection");

const staticRoute = require("./routes/staticRouter");
const urlRouter = require("./routes/url");
const userRouter = require("./routes/user");

// connect to the database
connectMongoDB("mongodb://127.0.0.1:27017/short-url")
  .then(() => {
    console.log("Connected to mongo db");
  })
  .catch((err) => {
    console.log("Unable to connect to mongo db ", err);
  });

app.set("view engine", "ejs");
app.set("views", path.resolve("./views"));
//middlewares
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());

// app.use("/test", async (req, res) => {
//   const allUrls = await URL.find({});
//   return res.render("home", {
//     urls: allUrls,
//   });

//   return res.render("home");
// });

app.use("/url", restrictedToOnlyLoggedUser, urlRouter);
app.use("/", authOnly,staticRoute);
app.use("/user", userRouter);

app.listen(PORT, () => {
  console.log("Server is listening at :", PORT);
});
