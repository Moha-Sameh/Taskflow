const { Employee, Department } = require("../../db/models");

//find department middleWare
exports.fetchDepartment = async (id, next) => {
  try {
    const department = await Department.findByPk(id);
    return department;
  } catch (error) {
    next(error);
  }
};

//MiddleWare to find Employee by ID
exports.findEmployee = async (req, _, next) => {
  try {
    const employee = await Employee.findOne({
      where: {
        username: req.body.employee,
      },
    });
    req.employee = employee;
    next();
  } catch (error) {
    next(error);
  }
};

exports.createDep = async (req, res, next) => {
  try {
    //req.body.employee = req.Employee.id;
    const newDepartment = await Department.create(req.body);
    res.status(201).json(newDepartment);
  } catch (error) {
    next(error);
  }
};

exports.updateDep = async (req, res, next) => {
  try {
    await req.employee.update(req.body);
    res.status(204).end();
  } catch (err) {
    next(error);
  }
};

//View department
exports.viewDepartment = async (req, res, next) => {
  try {
    const departments = await Department.findAll({
      attributes: { exclude: ["createdAt", "updatedAt"] },
      include: {
        model: Employee,
        as: "employees",
        attributes: ["id", "firstName", "lastName"],
      },
    });
    res.json(departments);
  } catch (error) {
    next(error);
  }
};
