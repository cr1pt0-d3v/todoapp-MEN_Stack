const express = require("express");
const path = require("path");
const mongoose = require("mongoose");
const bodyParser = require("body-parser");
const session = require("express-session");
const expressLayouts = require("express-ejs-layouts");

// initialize our express app
const app = express();

// DB Config
const db = require("./config/keys").MongoURI;

// connect to Mongo
mongoose
  .connect(db, {
    useNewUrlParser: true,
    useCreateIndex: true,
    useFindAndModify: true,
    useUnifiedTopology: true,
  })
  .then(() => console.log("MongoDB connected..."))
  .catch((err) => console.log(err));

// store session data
app.use(
  session({
    secret: "secret",
    resave: false,
    saveUninitialized: false,
  })
);

//importing my routes
const homeRoute = require("../server/route/homeRoute");

app.use("/public", express.static(path.join(__dirname, "../public")));

// bodyparser
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

// EJS
app.use(expressLayouts);
app.set("view engine", "ejs");

//Routes
app.use("/", homeRoute);

// defining your PORT
const hostname = "127.0.0.1";
const PORT = process.env.PORT || 8080;
app.listen(PORT, hostname, () => {
  console.log(`Server is running at http://${hostname}:${PORT}/`);
});
