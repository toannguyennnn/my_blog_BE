"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class Blog extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      Blog.belongsTo(models.User, {
        foreignKey: "user_id",
      });
    }
  }
  Blog.init(
    {
      title: DataTypes.STRING,
      description: DataTypes.STRING,
      category: DataTypes.STRING,
      content: DataTypes.TEXT("long"),
      image: DataTypes.BLOB("long"),
      user_id: DataTypes.INTEGER,
    },
    {
      sequelize,
      modelName: "Blog",
    }
  );
  return Blog;
};
