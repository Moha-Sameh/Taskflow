"use strict";

const fs = require("fs");
const path = require("path");
const Sequelize = require("sequelize");
const basename = path.basename(__filename);
const env = process.env.NODE_ENV || "development";
const config = require(__dirname + "/../config/config")[env];
const db = {};

let sequelize;
if (config.use_env_variable) {
  sequelize = new Sequelize(process.env[config.use_env_variable], config);
} else {
  sequelize = new Sequelize(
    config.database,
    config.username,
    config.password,
    config
  );
}

fs.readdirSync(__dirname)
  .filter((file) => {
    return (
      file.indexOf(".") !== 0 && file !== basename && file.slice(-3) === ".js"
    );
  })
  .forEach((file) => {
    const model = require(path.join(__dirname, file))(
      sequelize,
      Sequelize.DataTypes
    );
    db[model.name] = model;
  });

Object.keys(db).forEach((modelName) => {
  if (db[modelName].associate) {
    db[modelName].associate(db);
  }
});

db.sequelize = sequelize;
db.Sequelize = Sequelize;

//Employee association
db.Employee.belongsTo(db.Employee, {
  as: "manager",
  foreignKey: "managerId",
  useJunctionTable: false,
});

db.Employee.belongsToMany(db.Task, {
  through: "employeeTasks",
  as: "tasks",
  foreignKey: "employeeId",
});

db.Task.belongsToMany(db.Employee, {
  through: "employeeTasks",
  as: "employees",
  foreignKey: "taskId",
});

db.Department.hasMany(db.Employee, {
  foreignKey: {
    name: "depId",
    as: "employees",
    allowNull: false,
  },
});

db.Employee.belongsTo(db.Department, {
  foreignKey: {
    name: "depId",
    as: "department",
    allowNull: false,
  },
});

//Task and Project association
db.Project.hasMany(db.Task, {
  foreignKey: {
    name: "projectId",
    as: "tasks",
    allowNull: false,
  },
});

db.Task.belongsTo(db.Project, {
  foreignKey: {
    name: "projectId",
    as: "project",
    allowNull: false,
  },
});

module.exports = db;
