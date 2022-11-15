'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.bulkInsert('SongPlaylists', [
      {
        playlistId: 1,
        songId: 1,
      },
      {
        playlistId: 1,
        songId: 2,
      },
      {
        playlistId: 2,
        songId: 2,
      },
      {
        playlistId: 2,
        songId: 3,
      },
      {
        playlistId: 3,
        songId: 3,
      },
      {
        playlistId: 3,
        songId: 4,
      },
      {
        playlistId: 4,
        songId: 4,
      },
      {
        playlistId: 4,
        songId: 5,
      },

    ], {});
  },

  down: async (queryInterface, Sequelize) => {
    const Op = Sequelize.Op;
    await queryInterface.bulkDelete('SongPlaylists', {
      id: { [Op.in]: [1, 2, 3, 4, 5, 6, 7, 8] }
    }, {});
  }
};
