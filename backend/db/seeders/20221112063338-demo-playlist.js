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
        imageUrl: 'https://www.ikmultimedia.com/products/stedm/main-banner/mobile.jpg'
      },
      {
        userId: 1,
        name: 'User1Playlist2',
        imageUrl: 'https://static.vecteezy.com/system/resources/thumbnails/023/137/505/small/robot-disc-jockey-at-the-dj-mixer-and-turntable-plays-nightclub-during-party-edm-entertainment-party-concept-neural-network-generated-art-photo.jpg'
      },
      {
        userId: 2,
        name: 'User2Playlist1',
        imageUrl: 'https://www.ikmultimedia.com/products/stedm/main-banner/mobile.jpg'
      },
      {
        userId: 2,
        name: 'User2Playlist2',
        imageUrl: 'https://static.vecteezy.com/system/resources/thumbnails/023/137/505/small/robot-disc-jockey-at-the-dj-mixer-and-turntable-plays-nightclub-during-party-edm-entertainment-party-concept-neural-network-generated-art-photo.jpg'
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
