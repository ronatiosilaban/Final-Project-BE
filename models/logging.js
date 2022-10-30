"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class logging extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      logging.belongsTo(models.users, {
        as: "users",
        foreignKey: {
          name: "userId",
        },
      });
    }
  }
  logging.init(
    {
      statusCode: DataTypes.STRING,
      error: DataTypes.TEXT,
      method: DataTypes.STRING,
      url: DataTypes.STRING,
      date: DataTypes.STRING,
      username: DataTypes.STRING,
      userId: DataTypes.INTEGER,
    },
    {
      sequelize,
      modelName: "logging",
    }
  );
  return logging;
};
