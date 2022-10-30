"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class listbarang extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      listbarang.belongsTo(models.users, {
        as: "users",
        foreignKey: {
          name: "idUser",
        },
      });

      listbarang.hasMany(models.flow, {
        as: "flow",
        foreignKey: {
          name: "idList",
        },
      });

      listbarang.belongsTo(models.category, {
        as: "category",
        foreignKey: {
          name: "idCategory",
        },
      });

      listbarang.belongsTo(models.suplier, {
        as: "suplier",
        foreignKey: {
          name: "idSuplier",
        },
      });
      listbarang.hasMany(models.amount, {
        as: "qty",
        foreignKey: {
          name: "idQty",
        },
      });
    }
  }
  listbarang.init(
    {
      name: DataTypes.STRING,
      desc: DataTypes.STRING,
      image: DataTypes.STRING,
      idUser: DataTypes.INTEGER,
      idCategory: DataTypes.INTEGER,
      idSuplier: DataTypes.INTEGER,
    },
    {
      sequelize,
      modelName: "listbarang",
    }
  );
  return listbarang;
};
