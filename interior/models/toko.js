'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Toko extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      Toko.belongsTo(models.Kategori)
      Toko.belongsTo(models.Motor)
    }
  };
  Toko.init({
    nama: DataTypes.STRING,
    telp: DataTypes.STRING,
    long: DataTypes.FLOAT,
    lat: DataTypes.FLOAT,
    mapUrl: DataTypes.STRING,
    status: DataTypes.INTEGER
  }, {
    sequelize,
    modelName: 'Toko',
  });
  return Toko;
};