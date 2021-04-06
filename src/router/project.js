const express = require("express");
const {
  createProject,
  deleteProject,
  viewProject,
} = require("../controller/project.js");

const router = express.Router();

router.get("/", viewProject);
router.post("/", createProject);
router.delete("/:id", deleteProject);

module.exports = router;
