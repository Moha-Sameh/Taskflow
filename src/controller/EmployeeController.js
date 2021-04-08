const { Employee, Department } = require("../../db/models");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

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
    next(error);
  }
};

exports.createEmployee = async (req, res, next) => {
  try {
    if (req.file) {
      req.body.image = `http://${req.get("host")}/media/${req.file.filename}`;
    }
    const hashedPassword = await bcrypt.hash(req.body.password, 10);
    req.body.departmentId = req.department.id;
    req.body.password = hashedPassword;
    const newEmployee = await Employee.create(req.body);
    const payload = {
      id: newEmployee.id,
      username: newEmployee.username,
      exp: Date.now() + process.env.JWT_EXPIRATION_MS,
    };
    const token = jwt.sign(JSON.stringify(payload), process.env.JWT_SECRET);
    res.status(201).json({ token });
  } catch (error) {
    next(error);
  }
};

exports.signInEmployee = (req, res, next) => {
  try {
    const { user } = req;
    const payload = {
      id: user.id,
      username: user.username,
      role: user.role,
      manager: user.manager,
      image: user.image,
      exp: Date.now() + parseInt(process.env.JWT_EXPIRATION_MS),
    };
    const token = jwt.sign(JSON.stringify(payload), process.env.JWT_SECRET);
    res.json({ token });
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
        attributes: ["name"],
      },
    });
    res.json(employees);
  } catch (error) {
    next(error);
  }
};
exports.dropEmployee = async (req, res, next) => {
  try {
    await req.Employee.destroy();
    res.status(204).end();
  } catch (err) {
    next(error);
  }
};

exports.updateEmployee = async (req, res, next) => {
  try {
    await req.Employee.update(req.body);
    res.status(204).end();
  } catch (err) {
    next(error);
  }
};
