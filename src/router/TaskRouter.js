const express = require("express");
const router = express.Router();
const passport = require("passport");
// controllers
const {
  employeeCreate,
  employeeList,
  employeeUpdate,
  employeeDelete,
  fetchEmployee,
} = require("../controller/EmployeeController");

router.param("employeeId", async (req, res, next, employeeId) => {
  const emplyee = await fetchBooking(employeeId, next);
  if (emplyee) {
    req.emplyee = emplyee;
    next();
  } else {
    const err = new Error("Employee ID must be wrong please try again");
    err.status = 404;
    next(err);
  }
});
// Product list
router.get("/", employeeList);

// Adding Products
router.post(
  "/",
  passport.authenticate("jwt", { session: false }),
  employeeCreate
);
// router.post(
//   "/:hotelId/Rooms",
//   passport.authenticate("jwt", { session: false }),
//   roomsCreate
// );

// Deleting Products
router.delete("/:employeeId", employeeDelete);

// Updating Products
router.put("/:employeeId", employeeUpdate);

module.exports = router;
