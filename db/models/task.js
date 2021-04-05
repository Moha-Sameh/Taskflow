"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class TASK extends Model {
    static associate(models) {
      // define association here
    }
  }
  TASK.init(
    {
      taskDetails: DataTypes.STRING,
      complete: DataTypes.BOOLEAN,
    },
    {
      sequelize,
      modelName: "TASK",
    }
  );
  return TASK;
};
