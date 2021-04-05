const { Employee } = require("../db/models");

exports.fetchEmployee = async (employeeId, next) => {
  try {
    const employee = await Employee.findByPk(employeeId);
    return employee;
  } catch (error) {
    next(error);
  }
};
exports.employeeCreate = async (req, res, next) => {
  if (req.user.id === req.employee.userId) {
    try {
      if (req.file) {
        req.body.image = `http://${req.get("host")}/media/${req.file.filename}`;
      }
      req.body.userId = req.user.id;
      const newEmployee = await Employee.create(req.body);
      res.status(201).json(newEmployee);
    } catch (error) {
      next(error);
    }
  }
};

exports.employeeList = async (req, res, next) => {
  try {
    const employees = await Employee.findAll({
      attributes: { exclude: ["createdAt", "updatedAt"] },
      include: {
        model: Rooms,
        as: "HotelRooms",
        attributes: ["id"],
      },
    });
    res.json(employees);
  } catch (error) {
    next(error);
  }
};
exports.employeeDelete = async (req, res, next) => {
  try {
    await req.employee.destroy();
    res.status(204).end();
  } catch (err) {
    next(error);
  }
};

exports.employeeUpdate = async (req, res, next) => {
  try {
    await req.employee.update(req.body);
    res.status(204).end();
  } catch (err) {
    next(error);
  }
};
