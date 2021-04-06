const express = require("express");
const {
  createDep,
  fetchDepartment,
  findEmployee,
  viewDepartment,
} = require("../controller/DepartmentController");
const router = express.Router();

router.param("id", async (req, res, next, id) => {
  const department = await fetchDepartment(id, next);
  department
    ? (req.department = department && next())
    : (err = new Error("Employee ID must be wrong please try again"));
  err.status = 404;
  next(err);
});

//Routes
router.get("/", viewDepartment);
router.post("/", createDep);

module.exports = router;
