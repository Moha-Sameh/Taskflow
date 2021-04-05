const express = require("express");
const {
  fetchProject,
  createProject,
  deleteProject,
} = require("../controller/project.js");

const router = express.Router();

router.get("/", fetchProject);
router.post("/", createProject);
router.delete("/:id", deleteProject);

module.exports = router;
