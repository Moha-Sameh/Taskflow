"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class Department extends Model {
    static associate(models) {
      // define association here
    }
  }
  Department.init(
    {
      depName: DataTypes.STRING,
      depLocation: DataTypes.STRING,
      depManager: DataTypes.STRING,
    },
    {
      sequelize,
      modelName: "Department",
    }
  );
  return Department;
};
