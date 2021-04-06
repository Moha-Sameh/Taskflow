const { Task, Project } = require("../../db/models");

exports.fetchTask = async (taskId, next) => {
  try {
    const task = await Task.findByPk(taskId);
    return task;
  } catch (error) {
    next(error);
  }
};

//Find project by ID
exports.findProject = async (req, _, next) => {
  try {
    const project = await Project.findOne({
      where: {
        name: req.body.project,
      },
    });
    req.project = project;
    next();
  } catch (error) {
    next(error);
  }
};

exports.createTask = async (req, res, next) => {
  try {
    req.body.projectId = req.project.id;
    const newTask = await Task.create(req.body);
    res.status(201).json(newTask);
  } catch (error) {
    next(error);
  }
};

exports.viewTasks = async (req, res, next) => {
  try {
    const tasks = await Task.findAll({
      attributes: { exclude: ["createdAt", "updatedAt", "projectId"] },
      include: {
        model: Project,
        as: "project",
        attributes: ["name"],
      },
    });

    res.json(tasks);
  } catch (error) {
    next(error);
  }
};
exports.dropTask = async (req, res, next) => {
  try {
    await req.task.destroy();
    res.status(204).end();
  } catch (err) {
    next(error);
  }
};

exports.updateTask = async (req, res, next) => {
  try {
    await req.task.update(req.body);
    res.status(204).end();
  } catch (err) {
    next(error);
  }
};
