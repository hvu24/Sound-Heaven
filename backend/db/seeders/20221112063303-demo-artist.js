'use strict';

let options = {};
if (process.env.NODE_ENV === 'production') {
  options.schema = process.env.SCHEMA;  // define your schema in options object
}

module.exports = {
  up: async (queryInterface, Sequelize) => {
    options.tableName = 'Artists'
    await queryInterface.bulkInsert(options, [
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
    options.tableName = 'Artists'
    await queryInterface.bulkDelete(options, {
      userId: { [Op.in]: [1, 2, 3] }
    }, {});
  }
};
