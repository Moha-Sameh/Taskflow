const express = require("express");
const router = express.Router();
const passport = require("passport");
// controllers
const {
  fetchTask,
  viewTasks,
  createTask,
  dropTask,
  updateTask,
} = require("../controller/TaskController");

router.param("id", async (req, res, next, id) => {
  const task = await fetchTask(id, next);
  if (task) {
    req.task = task;
    next();
  } else {
    const err = new Error("Employee ID must be wrong please try again");
    err.status = 404;
    next(err);
  }
});

router.get("/", viewTasks);
router.post("/", passport.authenticate("jwt", { session: false }), createTask);
router.delete("/:employeeId", dropTask);
router.put("/:employeeId", updateTask);

module.exports = router;
