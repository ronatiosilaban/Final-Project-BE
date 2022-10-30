"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class suplier extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      suplier.hasMany(models.listbarang, {
        as: "listbarang",
        foreignKey: {
          name: "idSuplier",
        },
      });
    }
  }
  suplier.init(
    {
      name: DataTypes.STRING,
      address: DataTypes.STRING,
      phone: DataTypes.STRING,
    },
    {
      sequelize,
      modelName: "suplier",
    }
  );
  return suplier;
};
