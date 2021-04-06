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
      name: DataTypes.STRING,
      location: DataTypes.STRING,
      manager: DataTypes.STRING,
    },
    {
      sequelize,
      modelName: "Department",
    }
  );
  return Department;
};
