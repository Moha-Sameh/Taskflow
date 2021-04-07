"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class Task extends Model {
    static associate(models) {
      // define association here
    }
  }
  Task.init(
    {
      details: DataTypes.STRING,
      complete: DataTypes.BOOLEAN,
      startDate: DataTypes.STRING,
      deadLine: DataTypes.STRING,
    },
    {
      sequelize,
      modelName: "Task",
    }
  );
  return Task;
};
