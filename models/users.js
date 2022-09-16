'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class users extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      users.hasMany(models.listBarang, {
        as: "listBarang",
        foreignKey: {
          name: "idUser",
        },
      });
      users.hasMany(models.profile, {
        as: "profile",
        foreignKey: {
          name: "idProfile",
        },
      });
    }
  }
  users.init({
    username: DataTypes.STRING,
    password: DataTypes.STRING,
    status: DataTypes.STRING
  }, {
    sequelize,
    modelName: 'users',
  });
  return users;
};