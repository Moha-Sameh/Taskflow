"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class PROJECT extends Model {
    static associate(models) {
      // define association here
    }
  }
  PROJECT.init(
    {
      projectName: DataTypes.STRING,
      projectCode: DataTypes.INTEGER,
    },
    {
      sequelize,
      modelName: "PROJECT",
    }
  );
  return PROJECT;
};
