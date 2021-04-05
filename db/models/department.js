"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class DEPARTMENT extends Model {
    static associate(models) {
      // define association here
    }
  }
  DEPARTMENT.init(
    {
      depName: DataTypes.STRING,
      depLocation: DataTypes.STRING,
      depManager: DataTypes.STRING,
    },
    {
      sequelize,
      modelName: "DEPARTMENT",
    }
  );
  return DEPARTMENT;
};
