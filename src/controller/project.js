const { Project, Task } = require("../../db/models");

exports.fetchProject = async (req, res) => {
  try {
    const projects = await Project.findAll();
    res.json(projects);
  } catch (err) {
    res.json(err);
  }
};

exports.createProject = async (req, res) => {
  try {
    const newProject = await Project.create(req.body);
    res.status(201).json(newProject);
  } catch (err) {
    res.json(err);
  }
};

exports.deleteProject = async (req, res) => {
  try {
    // console.log(req.params.id);
    await Project.destroy({
      where: {
        id: req.params.id,
      },
    });
    res
      .status(204)
      .json({ messege: `project with id ${req.params.id} deleted` });
  } catch (err) {
    res.json(err);
  }
};

//View Project
exports.viewProject = async (req, res, next) => {
  try {
    const projects = await Project.findAll({
      attributes: { exclude: ["createdAt", "updatedAt"] },
      include: {
        model: Task,
        as: "tasks",
        attributes: ["id", "details", "complete"],
      },
    });
    res.json(projects);
  } catch (error) {
    next(error);
  }
};
