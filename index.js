const express = require("express");
const db = require("./db/models");
const cors = require("cors");
const app = express();
const path = require("path");
const passport = require("passport");

//router Require
const EmployeeRoutes = require("./src/router/EmployeeRouter");
const TaskRoutes = require("./src/router/TaskRouter");
const ProjectRoutes = require("./src/router/project");
const DepartmentRoutes = require("./src/router/DepartmentRouter");
const EmployeeTaskRoutes = require("./src/router/EmployeeTask");

// Passport Strategies
const { localStrategy, jwtStrategy } = require("./src/middleWare/passport");

//middleware
app.use(cors());
app.use(express.json());
app.use((err, req, res, next) => {
  res.status(err.status || 500);
  res.json({
    message: err.message || "Internal Server Error",
  });
  console.log(err);
  next(err);
});

// Passport Setup
app.use(passport.initialize());
passport.use(localStrategy);
passport.use(jwtStrategy);

//Routes
app.use("/Employee", EmployeeRoutes);
app.use("/Task", TaskRoutes);
app.use("/Project", ProjectRoutes);
app.use("/Department", DepartmentRoutes);
app.use("/Employeetask", EmployeeTaskRoutes);

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
  } catch (error) {
    console.error("Error connecting to the database: ", error);
  }

  await app.listen(process.env.PORT, () => {});
};

run();
