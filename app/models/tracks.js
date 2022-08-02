const { Model } = require('sequelize')
module.exports = (sequelize, DataTypes) => {
  class Tracks extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      Tracks.belongsTo(models.Artists, { foreignKey: 'artistId' })
    }
  }
  Tracks.init(
    {
      id: {
        defaultValue: DataTypes.UUIDV4,
        primaryKey: true,
        type: DataTypes.UUID,
        validate: {
          isUUID: { args: 4, msg: 'Id not valid, please try again' },
        },
      },
      isrc: DataTypes.STRING,
      spotifyImageUri: DataTypes.STRING,
      title: DataTypes.STRING,
    },
    {
      sequelize,
      modelName: 'Tracks',
    }
  )
  return Tracks
}
