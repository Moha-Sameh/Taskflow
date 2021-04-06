const { Employee, Department } = require("../../db/models");

//find employee middleWare
exports.fetchEmployee = async (id, next) => {
  try {
    const employee = await Employee.findByPk(id);
    return employee;
  } catch (error) {
    next(error);
  }
};

//MiddleWare to find Department by ID
exports.findDepartment = async (req, _, next) => {
  try {
    const department = await Department.findOne({
      where: {
        name: req.body.department,
      },
    });
    req.department = department;
    next();
  } catch (error) {
    next(erorr);
  }
};

exports.createEmployee = async (req, res, next) => {
  try {
    if (req.file) {
      req.body.image = `http://${req.get("host")}/media/${req.file.filename}`;
    }
    req.body.departmentID = req.Department.id;
    const newEmployee = await Employee.create(req.body);
    res.status(201).json(newEmployee);
  } catch (error) {
    next(error);
  }
};

exports.viewEmployees = async (req, res, next) => {
  try {
    const employees = await Employee.findAll({
      attributes: { exclude: ["createdAt", "updatedAt"] },
      include: {
        model: Department,
        as: "department",
        attributes: ["depName"],
      },
    });
    res.json(employees);
  } catch (error) {
    next(error);
  }
};
exports.dropEmployee = async (req, res, next) => {
  try {
    await req.employee.destroy();
    res.status(204).end();
  } catch (err) {
    next(error);
  }
};

exports.updateEmployee = async (req, res, next) => {
  try {
    await req.employee.update(req.body);
    res.status(204).end();
  } catch (err) {
    next(error);
  }
};
