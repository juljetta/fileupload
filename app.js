const createError = require("http-errors");
const express = require("express");
const path = require("path");
const logger = require("morgan");

const mongoose = require("mongoose");
const hbs = require("hbs");

const indexRouter = require("./routes/index");
const usersRouter = require("./routes/users");
const authRouter = require("./routes/auth");
const profileRouter = require("./routes/profile");
const authorisationRouter = require("./routes/authorisation");
const postsRouter = require("./routes/posts");
const session = require("express-session");
const MongoStore = require("connect-mongo")(session);
const photosRouter = require("./routes/photos");
// const allPhotos = require("./routes/photos/all");

const app = express();

require("dotenv").config();

mongoose
  .connect(process.env.MONGO_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true
  })
  .then(connection => {
    console.log("successfully connected");
  })
  .catch(err => {
    console.log(err);
  });

mongoose.set("useCreateIndex", true);
mongoose.set("useFindAndModify", false);

//Session middleware. This will take care of storing the session in mongo,
//and
app.use(
  session({
    secret: "wow much secret, very secret", //encrypts cookie (so it hashes)
    cookie: { maxAge: 24 * 60 * 60 }, // options for cookie storage
    resave: false, //don't save session if unmodified
    saveUninitialized: false, // don't create session until something stored
    store: new MongoStore({
      mongooseConnection: mongoose.connection,
      ttl: 24 * 60 * 60 // 1 day expiration of sesh
    })
  })
);

// view engine setup
app.set("views", path.join(__dirname, "views"));
app.set("view engine", "hbs");
hbs.registerPartials(__dirname + "/views/partials");

app.use(logger("dev"));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(express.static(path.join(__dirname, "public")));

app.use("/", indexRouter);
app.use("/users", usersRouter);
app.use("/auth", authRouter);
//before we reach profileRouter function, we use our custom middleware
app.use("/profile", authorisationRouter, profileRouter);

app.use("/posts", postsRouter);
app.use("/photos", photosRouter);
// app.use("/photos/all", allPhotos);

// catch 404 and forward to error handler

app.use(function(req, res, next) {
  next(createError(404));
});

// error handler
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get("env") === "development" ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render("error");
});

module.exports = app;
