'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.bulkInsert('Songs', [
      {
        artistId: 1,
        albumId: 1,
        title: 'cat',
        description: 'blah',
        url: 'www.cat.com',
        imageUrl: 'www.catimg.com',
      },
      {
        artistId: 1,
        albumId: 1,
        title: 'dog',
        description: 'blah',
        url: 'www.dog.com',
        imageUrl: 'www.dogimg.com',
      },
      {
        artistId: 1,
        albumId: 2,
        title: 'zebra',
        description: 'blah',
        url: 'www.zebra.com',
        imageUrl: 'www.zebraimg.com',
      },
      {
        artistId: 1,
        albumId: 2,
        title: 'snake',
        description: 'blah',
        url: 'www.snake.com',
        imageUrl: 'www.snakeimg.com',
      },
      {
        artistId: 2,
        albumId: 3,
        title: 'dragon',
        description: 'blah',
        url: 'www.dragon.com',
        imageUrl: 'www.dragonimg.com',
      },
      {
        artistId: 2,
        albumId: 3,
        title: 'rat',
        description: 'blah',
        url: 'www.rat.com',
        imageUrl: 'www.ratimg.com',
      },
      {
        artistId: 2,
        albumId: 4,
        title: 'tiger',
        description: 'blah',
        url: 'www.tiger.com',
        imageUrl: 'www.tigerimg.com',
      },
      {
        artistId: 2,
        albumId: 4,
        title: 'ox',
        description: 'blah',
        url: 'www.ox.com',
        imageUrl: 'www.oximg.com',
      },
    ], {});
  },

  down: async (queryInterface, Sequelize) => {
    const Op = Sequelize.Op;
    await queryInterface.bulkDelete('Songs', {
      title: { [Op.in]: ['cat', 'dog', 'tiger', 'ox', 'snake', 'dragon', 'zebra', 'rat'] }
    }, {});
  }
};
