const express = require("express");
const router = express.Router();
const passport = require("passport");

// controllers
const {
  createEmployee,
  viewEmployees,
  updateEmployee,
  dropEmployee,
  fetchEmployee,
  findDepartment,
} = require("../controller/EmployeeController");
const upload = require("../middleWare/multer");

//Router param
router.param("id", async (req, res, next, id) => {
  const emplyee = await fetchEmployee(id, next);
  emplyee
    ? (req.emplyee = emplyee && next())
    : (err = new Error("Employee ID must be wrong please try again"));
  err.status = 404;
  next(err);
});
// Routes
router.get("/", viewEmployees);
router.post(
  "/",
  passport.authenticate("jwt", { session: false }),
  upload.single("image"),
  findDepartment,
  createEmployee
);
router.delete("/:id", dropEmployee);
router.put("/:id", upload.single("image"), updateEmployee);

module.exports = router;
