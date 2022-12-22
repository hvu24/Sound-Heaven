'use strict';

let options = {};
if (process.env.NODE_ENV === 'production') {
  options.schema = process.env.SCHEMA;  // define your schema in options object
}

module.exports = {
  up: async (queryInterface, Sequelize) => {
    options.tableName = 'SongPlaylists'
    await queryInterface.bulkInsert(options, [
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
    options.tableName = 'SongPlaylists'
    await queryInterface.bulkDelete(options, {
      id: { [Op.in]: [1, 2, 3, 4, 5, 6, 7, 8] }
    }, {});
  }
};
