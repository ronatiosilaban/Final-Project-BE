"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class amount extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      amount.belongsTo(models.listbarang, {
        as: "listbarang",
        foreignKey: {
          name: "idQty",
        },
      });
    }
  }
  amount.init(
    {
      qty: DataTypes.INTEGER,
      idQty: DataTypes.INTEGER,
    },
    {
      sequelize,
      modelName: "amount",
    }
  );
  return amount;
};
