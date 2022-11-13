'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.bulkInsert('Albums', [
      {
        artistId: 1,
        title: 'Artist1Album1',
        description: 'blahblah',
        imageUrl: 'www.somewhere.com'
      },
      {
        artistId: 1,
        title: 'Artist1Album2',
        description: 'blahblah',
        imageUrl: 'www.somewhereelse.com'
      },
      {
        artistId: 2,
        title: 'Artist2Album1',
        description: 'blahblah',
        imageUrl: 'www.somewherefar.com'
      },
      {
        artistId: 2,
        title: 'Artist2Album2',
        description: 'blahblah',
        imageUrl: 'www.somewhereelsefar.com'
      },
    ], {});
  },

  down: async (queryInterface, Sequelize) => {
    const Op = Sequelize.Op;
    await queryInterface.bulkDelete('Albums', {
      title: { [Op.in]: ['Artist1Album1', 'Artist1Album2', 'Artist2Album1', 'Artist2Album2'] }
    }, {});
  }
};
