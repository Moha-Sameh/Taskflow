const express = require("express");
const db = require("./db/models");
const cors = require("cors");
const app = express();
const router = require("./src/router/project");
//middleware
app.use(cors());
app.use(express.json());

app.get("/", (req, res) => {
  res.send("<h1>Hello World<h1>");
});

app.use("/project", router);

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
