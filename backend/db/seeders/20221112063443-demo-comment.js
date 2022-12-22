'use strict';

let options = {};
if (process.env.NODE_ENV === 'production') {
  options.schema = process.env.SCHEMA;  // define your schema in options object
}

module.exports = {
  up: async (queryInterface, Sequelize) => {
    options.tableName = 'Comments'
    await queryInterface.bulkInsert(options, [
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
    options.tableName = 'Comments'
    await queryInterface.bulkDelete(options, {
      id: { [Op.in]: [1, 2, 3, 4] }
    }, {});
  }
};
