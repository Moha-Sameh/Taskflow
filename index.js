const express = require("express");
const db = require("./db/models");
const cors = require("cors");
const app = express();
const path = require("path");
const passport = require("passport");

//router Require
const EmployeeRoutes = require("./src/router/EmployeeRouter");
const TaskRoutes = require("./src/router/TaskRouter");

// Passport Strategies
const { localStrategy, jwtStrategy } = require("./src/middleWare/passport");

// Passport Setup

app.use(passport.initialize());
passport.use(localStrategy);
passport.use(jwtStrategy);

//middleware
app.use(cors());
app.use(express.json());
app.use((err, req, res, next) => {
  res.status(err.status || 500);
  res.json({
    message: err.message || "Internal Server Error",
  });
  next(err);
});

//Routes
app.use("/Employee", EmployeeRoutes);
app.use("/Task", TaskRoutes);

//multer middleware
app.use("/media", express.static(path.join(__dirname, "media")));
app.use((err, req, res, next) => {
  res.status(err.status || 500);
  res.json({
    message: err.message || "Internal Server Error",
  });
  next(err);
});
app.use((req, res, next) => {
  res.status(404).json({ message: "Path not found" });
});

//App function
const run = async () => {
  try {
    await db.sequelize.sync({ force: false });
    console.log("Connection to the database successful!");
  } catch (error) {
    console.error("Error connecting to the database: ", error);
  }

  await app.listen(process.env.PORT, () => {
    console.log(`Server started on port ${process.env.PORT}`);
  });
};

run();
