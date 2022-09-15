'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class listBarang extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      listBarang.belongsTo(models.users, {
        as: "users",
        foreignKey: {
          name: "idUser",
        },
      });
      listBarang.belongsTo(models.Category, {
        as: "category",
        foreignKey: {
          name: "idCategory",
        },
      });
      listBarang.belongsTo(models.suplier, {
        as: "suplier",
        foreignKey: {
          name: "idSuplier",
        },
      });
      
      listBarang.hasMany(models.Flow, {
        as: "Flow",
        foreignKey: {
          name: "idList",
        },
      });

    
    }
  }
  listBarang.init({
    name: DataTypes.STRING,
    desc: DataTypes.TEXT,
    image: DataTypes.STRING,
    idUser: DataTypes.INTEGER,
    idCategory: DataTypes.INTEGER,
    idSuplier: DataTypes.INTEGER 
  }, {
    sequelize,
    modelName: 'listBarang',
  });
  return listBarang;
};