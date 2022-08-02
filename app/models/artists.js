const { Model } = require('sequelize')
module.exports = (sequelize, DataTypes) => {
  class Artists extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      Artists.hasMany(models.Tracks, { foreignKey: 'artistId' })
    }
  }
  Artists.init(
    {
      id: {
        defaultValue: DataTypes.UUIDV4,
        primaryKey: true,
        type: DataTypes.UUID,
        validate: {
          isUUID: { args: 4, msg: 'Id not valid, please try again' },
        },
      },
      artistName: DataTypes.STRING,
    },
    {
      sequelize,
      modelName: 'Artists',
    }
  )
  return Artists
}
