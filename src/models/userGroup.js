"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class UserGroup extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      UserGroup.hasMany(models.User, {
        foreignKey: "userGroup_id",
      });
      UserGroup.belongsToMany(
        models.Role,
        { through: "UserGroup_Role" },
        {
          foreignKey: "userGroup_id",
        }
      );
    }
  }
  UserGroup.init(
    {
      name: DataTypes.STRING,
      description: DataTypes.STRING,
    },
    {
      sequelize,
      modelName: "UserGroup",
    }
  );
  return UserGroup;
};
