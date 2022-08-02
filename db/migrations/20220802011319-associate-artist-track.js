module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.addColumn('Tracks', 'artistId', {
      type: Sequelize.UUID,
      references: {
        model: 'Artists',
        key: 'id',
      },
    })
  },

  async down(queryInterface) {
    await queryInterface.removeColumn('Tracks', 'artistId')
  },
}
