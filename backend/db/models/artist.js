'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Artist extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      Artist.belongsTo(
        models.User,
        { foreignKey: 'userId' }
      );

      Artist.hasMany(
        models.Album,
        { foreignKey: 'artistId', onDelete: 'CASCADE',  hooks: true }
      );

      Artist.hasMany(
        models.Song,
        { foreignKey: 'artistId', onDelete: 'CASCADE',  hooks: true }
      );
    }
  }
  Artist.init({
    totalSongs: DataTypes.INTEGER,
    totalAlbums: DataTypes.INTEGER,
    imageUrl: DataTypes.STRING,
    userId: DataTypes.INTEGER
  }, {
    sequelize,
    modelName: 'Artist',
  });
  return Artist;
};
