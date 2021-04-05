const { Project } = require("../../db/models");

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
