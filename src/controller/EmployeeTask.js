const { Employee, Task, employeeTasks, Project } = require("../../db/models");

exports.findTask = async (req, _, next) => {
  try {
    const task = await Task.findOne({
      where: {
        id: req.body.task,
      },
    });
    req.task = task;
    next();
  } catch (error) {
    next(error);
  }
};

exports.employeeAssigment = async (req, res, next) => {
  try {
    req.body.taskId = req.task.id;
    req.body.employeeId = req.employee.id;
    const employeeTask = await employeeTasks.create(req.body);
    res.status(201).json(employeeTask);
  } catch (error) {
    next(error);
  }
};

exports.viewEmployeeTask = async (_, res, next) => {
  try {
    const assiegnedTasks = await employeeTasks.findAll({
      attributes: { exclude: ["updatedAt", "createdAt"] },
      include: {
        model: Employee,
        as: "Employee",
        include: {
          model: Task,
          as: "tasks",
          attributes: {
            exclude: ["updatedAt", "createdAt", "id", "projectId"],
          },
          include: {
            model: Project,
            as: "project",
            attributes: { exclude: ["updatedAt", "createdAt", "id"] },
          },
        },
      },
    });

    res.json(assiegnedTasks);
  } catch (error) {
    next(error);
  }
};
