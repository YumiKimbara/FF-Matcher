const express = require("express");
const mongoose = require("mongoose");
const session = require("express-session");
const MongoDBStore = require("connect-mongodb-session")(session);
const cors = require("cors");
const path = require("path");
const dotenv = require("dotenv");

// const csrf = require("csurf");

//import models
const User = require("./models/user");

const app = express();
dotenv.config();
// this trust proxy will allow you to access req.session after deploy
app.set("trust proxy", 1);

// Store session in the MongoDBStore
const store = new MongoDBStore({
  uri: process.env.MONGODB_URI,
  collection: "sessions",
});

// const Protection = csrf();

//import routes
const questionRoutes = require("./routes/questionsRoutes");
const resultsRoutes = require("./routes/resultsRoutes");
const authRoutes = require("./routes/auth");
app.use(
  cors({
    origin: ["https://ff-matcher.onrender.com", "http://localhost:3000"],
    // origin: "http://ec2-35-183-29-247.ca-central-1.compute.amazonaws.com",
    credentials: true,
    allowedHeaders: ["Content-Type"],
  })
);

app.use(express.urlencoded({ extended: false }));
app.use(express.json());

//initialize session
app.use(
  session({
    secret: "my secret id",
    resave: false,
    saveUninitialized: false,
    store: store,
    cookie: {
      httpOnly: true,
      secure: true,
      maxAge: 1000 * 60 * 60 * 48,
      sameSite: "none",
    },
  })
);

// app.use(csrfProtection);

// app.use((req, res, next) => {
//   res.locals.isAuthenticated = req.session.isLoggedIn;
//   // res.locals.csrfToken = req.csrfToken();
//   console.log("hello");
//   next();
// });
app.use("/questions", questionRoutes);
app.use("/result", resultsRoutes);
app.use(authRoutes);

// Serve static files from the React frontend app
app.use(express.static(path.join(__dirname, "build")));
// Anything that doesn't match the above, send back index.html
// app.get("*", (req, res) => {
//   res.sendFile(path.join(__dirname + "/build/index.html"));
// });
app.get("*", (req, res) => {
  res.sendFile(path.join(__dirname, "./client/build/index.html"));
});

const port = process.env.PORT || 3001;

//connect to mongoose
mongoose
  .connect(process.env.MONGODB_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then((result) => {
    console.log("connected");
  })
  .catch((err) => {
    console.log(err);
  });

app.listen(port, () => {
  console.log(`port is running`);
});
