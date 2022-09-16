'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Flow extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      Flow.belongsTo(models.listBarang, {
        as: "listBarang",
        foreignKey: {
          name: "idList",
        },
      });
    }
  }
  Flow.init({
    name: DataTypes.STRING,
    nameRecipients: DataTypes.STRING,
    status: DataTypes.STRING,
    amount: DataTypes.INTEGER,
    date: DataTypes.STRING,
    idList: DataTypes.INTEGER
  }, {
    sequelize,
    modelName: 'Flow',
  });
  return Flow;
};