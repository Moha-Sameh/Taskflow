const { PROJECT } = require("../../db/models");
// const Tutorial = db.tutorials;
// const Op = db.Sequelize.Op;

exports.fetchProject = async (req, res) => {
  try {
    const projects = await PROJECT.findAll();
    res.json(projects);
  } catch (err) {
    res.json(err);
  }
};

exports.createProject = async (req, res) => {
  try {
    const newProject = await PROJECT.create(req.body);
    res.status(201).json(newProject);
  } catch (err) {
    res.json(err);
  }
};

exports.deleteProject = async (req, res) => {
  try {
    // console.log(req.params.id);
    await PROJECT.destroy({
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
