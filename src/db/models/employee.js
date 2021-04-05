"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class EMPLOYEE extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  }
  EMPLOYEE.init(
    {
      ename: {
        type: DataTypes.STRING,
        unique: {
          args: true,
          msg: "Username already exists",
        },
      },
      fname: DataTypes.STRING,
      lname: DataTypes.STRING,
      email: DataTypes.STRING,
      password: DataTypes.STRING,
      phoneNumber: DataTypes.STRING,
      gender: DataTypes.STRING,
      role: DataTypes.STRING,
      jobTitle: DataTypes.STRING,
    },
    {
      sequelize,
      modelName: "EMPLOYEE",
    }
  );
  return EMPLOYEE;
};
