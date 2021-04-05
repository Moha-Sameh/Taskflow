"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class EMPLOYEE extends Model {
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
