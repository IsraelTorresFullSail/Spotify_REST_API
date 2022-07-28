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
      isrc: {
        type: DataTypes.STRING,
        validate: {
          len: {
            args: [2, 50],
            msg: 'Track isrc is required to be at leats 2 characters',
          },
        },
      },
      spotifyImageUri: {
        type: DataTypes.STRING,
        validate: {
          len: {
            args: [2, 250],
            msg: 'Track spotifyImageUri is required to be at leats 2 characters',
          },
        },
      },
      title: {
        type: DataTypes.STRING,
        validate: {
          len: {
            args: [2, 250],
            msg: 'Track title is required to be at leats 2 characters',
          },
        },
      },
      artistNameList: {
        type: DataTypes.STRING,
        validate: {
          len: {
            args: [2, 250],
            msg: 'Track artistNameList is required to be at leats 2 characters',
          },
        },
      },
    },
    {
      sequelize,
      modelName: 'Tracks',
    }
  )
  return Tracks
}
