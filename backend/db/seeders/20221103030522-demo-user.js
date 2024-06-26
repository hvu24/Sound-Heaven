'use strict';
const bcrypt = require("bcryptjs");

let options = {};
if (process.env.NODE_ENV === 'production') {
  options.schema = process.env.SCHEMA;  // define your schema in options object
}

module.exports = {
  up: async (queryInterface, Sequelize) => {
    options.tableName = 'Users'
    await queryInterface.bulkInsert(options, [
      {
        email: 'user1@user.io',
        username: 'Illenium',
        firstName: 'fake1',
        lastName: 'user1',
        hashedPassword: bcrypt.hashSync('password2')
      },
      {
        email: 'user2@user.io',
        username: 'Alan Walker',
        firstName: 'fake2',
        lastName: 'user2',
        hashedPassword: bcrypt.hashSync('password3')
      }
    ], {});
  },

  down: async (queryInterface, Sequelize) => {
    const Op = Sequelize.Op;
    options.tableName = 'Users'
    await queryInterface.bulkDelete(options, {
      username: { [Op.in]: ['Illenium', 'Alan Walker'] }
    }, {});
  }
};
