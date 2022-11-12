'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.bulkInsert('Comments', [
      {
        userId: 1,
        songId: 1,
        body: 'comment from user 1 on song 1'
      },
      {
        userId: 1,
        songId: 2,
        body: 'comment from user 1 on song 2'
      },
      {
        userId: 2,
        songId: 1,
        body: 'comment from user 2 on song 1'
      },
      {
        userId: 2,
        songId: 2,
        body: 'comment from user 2 on song 2'
      },

    ], {});
  },

  down: async (queryInterface, Sequelize) => {
    const Op = Sequelize.Op;
    await queryInterface.bulkDelete('Comments', {
      id: { [Op.in]: [1, 2, 3, 4] }
    }, {});
  }
};
