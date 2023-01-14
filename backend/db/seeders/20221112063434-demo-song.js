'use strict';

let options = {};
if (process.env.NODE_ENV === 'production') {
  options.schema = process.env.SCHEMA;  // define your schema in options object
}

module.exports = {
  up: async (queryInterface, Sequelize) => {
    options.tableName = 'Songs'
    await queryInterface.bulkInsert(options, [
      {
        artistId: 1,
        albumId: 1,
        title: 'Feel Good (feat. Daya)',
        description: 'Performed by: Daya, Gryffin, ILLENIUM',
        url: 'www.cat.com',
        imageUrl: 'https://i.ytimg.com/vi/sZLLB6JNKpU/maxresdefault.jpg',
      },
      {
        artistId: 1,
        albumId: 1,
        title: "Don't Let Me Down (feat. Daya) -Illenium",
        description: 'Performed by: Daya, ILLENIUM, The Chainsmokers',
        url: 'www.dog.com',
        imageUrl: 'https://i1.sndcdn.com/artworks-9Fn34Td0doc5xaUF-i33pZg-t500x500.jpg',
      },
      {
        artistId: 1,
        albumId: 2,
        title: 'Feel Something (With I Prevail)',
        description: 'Performed by: Excision, I Prevail, ILLENIUM',
        url: 'www.zebra.com',
        imageUrl: 'https://i1.sndcdn.com/artworks-mcJjsdg2NOJNTc6B-Lhb9Ww-t500x500.jpg',
      },
      {
        artistId: 1,
        albumId: 2,
        title: 'Good Things Fall Apart (with Jon Bellion)',
        description: 'Performed by: ILLENIUM, Jon Bellion',
        url: 'www.snake.com',
        imageUrl: 'https://i1.sndcdn.com/artworks-000528649119-tnzen4-t500x500.jpg',
      },
      {
        artistId: 2,
        albumId: 3,
        title: 'Faded',
        description: 'Performed by: Alan Walker',
        url: 'www.dragon.com',
        imageUrl: 'https://jesusful.com/wp-content/uploads/2022/07/Alan-Walker-Faded-Mp3-Download-Lyrics.jpg',
      },
      {
        artistId: 2,
        albumId: 3,
        title: 'Darkside',
        description: 'Performed by: Alan Walker, Au/Ra, Tomine Harket',
        url: 'www.rat.com',
        imageUrl: 'https://i1.sndcdn.com/artworks-000382170156-lk06ty-t500x500.jpg',
      },
      {
        artistId: 2,
        albumId: 4,
        title: 'Alone',
        description: 'Performed by: Alan Walker, Ava Max',
        url: 'www.tiger.com',
        imageUrl: 'https://i1.sndcdn.com/artworks-000647913412-ckdhxi-t500x500.jpg',
      },
      {
        artistId: 2,
        albumId: 4,
        title: 'On My Way',
        description: 'Performed by: Alan Walker, Farruko, Sabrina Carpenter',
        url: 'www.ox.com',
        imageUrl: 'https://i.ytimg.com/vi/p0QmF9VDiVg/maxresdefault.jpg',
      },
    ], {});
  },

  down: async (queryInterface, Sequelize) => {
    const Op = Sequelize.Op;
    options.tableName = 'Songs'
    await queryInterface.bulkDelete(options, {
      title: { [Op.in]: ['cat', 'dog', 'tiger', 'ox', 'snake', 'dragon', 'zebra', 'rat'] }
    }, {});
  }
};
