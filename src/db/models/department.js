"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class DEPARTMENT extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
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
