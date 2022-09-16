'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class profile extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      profile.belongsTo(models.users, {
        as: "users",
        foreignKey: {
          name: "idProfile",
        },
      });
    }
  }
  profile.init({
    possition: DataTypes.STRING,
    image: DataTypes.STRING,
    desc: DataTypes.STRING,
    idProfile: DataTypes.INTEGER
  }, {
    sequelize,
    modelName: 'profile',
  });
  return profile;
};