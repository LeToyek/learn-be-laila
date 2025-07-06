"use strict";
const { Model } = require("sequelize");

module.exports = (sequelize, DataTypes) => {
  class Group extends Model {
    static associate(models) {
      // 1 group bisa dimiliki banyak user
      Group.hasMany(models.User, { foreignKey: "group_id" });
    }
  }

  Group.init(
    {
      name: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: true,
      },
      description: {
        type: DataTypes.STRING,
        allowNull: true,
      },
    },
    {
      sequelize,
      modelName: "Group",
      tableName: "Groups",
    }
  );

  return Group;
};
