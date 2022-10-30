"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class flow extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      flow.belongsTo(models.listbarang, {
        as: "listbarang",
        foreignKey: {
          name: "idList",
        },
      });
    }
  }
  flow.init(
    {
      nameRecipients: DataTypes.STRING,
      status: DataTypes.STRING,
      amount: DataTypes.INTEGER,
      date: DataTypes.STRING,
      image: DataTypes.STRING,
      idList: DataTypes.INTEGER,
    },
    {
      sequelize,
      modelName: "flow",
    }
  );
  return flow;
};
