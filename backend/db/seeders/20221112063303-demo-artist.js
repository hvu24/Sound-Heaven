'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.bulkInsert('Artists', [
      {
        totalSongs: 4,
        totalAlbums: 2,
        imageUrl: 'www.abc.com',
        userId: 1,
      },
      {
        totalSongs: 4,
        totalAlbums: 2,
        imageUrl: 'www.def.com',
        userId: 2,
      }
    ], {});
  },

  down: async (queryInterface, Sequelize) => {
    const Op = Sequelize.Op;
    await queryInterface.bulkDelete('Artists', {
      userId: { [Op.in]: [1, 2, 3] }
    }, {});
  }
};
