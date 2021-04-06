const express = require("express");
const { findEmployee } = require("../controller/DepartmentController");
const {
  viewEmployeeTask,
  employeeAssigment,
  findTask,
} = require("../controller/EmployeeTask");

const router = express.Router();

router.get("/", findEmployee, findTask, viewEmployeeTask);
router.post("/", findEmployee, findTask, employeeAssigment);

module.exports = router;
