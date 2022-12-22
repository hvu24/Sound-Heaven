'use strict';

let options = {};
if (process.env.NODE_ENV === 'production') {
  options.schema = process.env.SCHEMA;  // define your schema in options object
}

module.exports = {
  up: async (queryInterface, Sequelize) => {
    options.tableName = 'Playlists'
    await queryInterface.bulkInsert(options, [
      {
        userId: 1,
        name: 'User1Playlist1',
        imageUrl: 'www.someplace.com'
      },
      {
        userId: 1,
        name: 'User1Playlist2',
        imageUrl: 'www.someplaceelse.com'
      },
      {
        userId: 2,
        name: 'User2Playlist1',
        imageUrl: 'www.place.com'
      },
      {
        userId: 2,
        name: 'User2Playlist2',
        imageUrl: 'www.placeelse.com'
      },

    ], {});
  },

  down: async (queryInterface, Sequelize) => {
    const Op = Sequelize.Op;
    options.tableName = 'Playlists'
    await queryInterface.bulkDelete(options, {
      name: { [Op.in]: ['User1Playlist1','User1Playlist2','User2Playlist1','User2Playlist2',] }
    }, {});
  }
};
