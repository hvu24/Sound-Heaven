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
        url: "https://myawsbucket-ahv.s3.us-west-1.amazonaws.com/Gryffin%2C+Illenium+-+Feel+Good+ft.+Daya.mp3",
        imageUrl: 'https://i.ytimg.com/vi/sZLLB6JNKpU/maxresdefault.jpg',
      },
      {
        artistId: 1,
        albumId: 1,
        title: "Don't Let Me Down (feat. Daya) -Illenium",
        description: 'Performed by: Daya, ILLENIUM, The Chainsmokers',
        url: "https://myawsbucket-ahv.s3.us-west-1.amazonaws.com/The+Chainsmokers+-+Don't+Let+Me+Down+(Official+Video)+ft.+Daya.mp3",
        imageUrl: 'https://i1.sndcdn.com/artworks-9Fn34Td0doc5xaUF-i33pZg-t500x500.jpg',
      },
      {
        artistId: 1,
        albumId: 2,
        title: 'Feel Something (With I Prevail)',
        description: 'Performed by: Excision, I Prevail, ILLENIUM',
        url: "https://myawsbucket-ahv.s3.us-west-1.amazonaws.com/ILLENIUM%2C+Excision%2C+I+Prevail+-+Feel+Something+(Lyric+Video).mp3",
        imageUrl: 'https://i1.sndcdn.com/artworks-mcJjsdg2NOJNTc6B-Lhb9Ww-t500x500.jpg',
      },
      {
        artistId: 1,
        albumId: 2,
        title: 'Good Things Fall Apart (with Jon Bellion)',
        description: 'Performed by: ILLENIUM, Jon Bellion',
        url: "https://myawsbucket-ahv.s3.us-west-1.amazonaws.com/ILLENIUM%2C+Jon+Bellion+-+Good+Things+Fall+Apart+(Lyric+Video).mp3",
        imageUrl: 'https://i1.sndcdn.com/artworks-000528649119-tnzen4-t500x500.jpg',
      },
      {
        artistId: 2,
        albumId: 3,
        title: 'Faded',
        description: 'Performed by: Alan Walker',
        url: "https://myawsbucket-ahv.s3.us-west-1.amazonaws.com/Alan+Walker+-+Faded.mp3",
        imageUrl: 'https://jesusful.com/wp-content/uploads/2022/07/Alan-Walker-Faded-Mp3-Download-Lyrics.jpg',
      },
      {
        artistId: 2,
        albumId: 3,
        title: 'Darkside',
        description: 'Performed by: Alan Walker, Au/Ra, Tomine Harket',
        url: "https://myawsbucket-ahv.s3.us-west-1.amazonaws.com/Alan+Walker+-+Darkside+(feat.+Au-Ra+and+Tomine+Harket).mp3",
        imageUrl: 'https://i1.sndcdn.com/artworks-000382170156-lk06ty-t500x500.jpg',
      },
      {
        artistId: 2,
        albumId: 4,
        title: 'Alone',
        description: 'Performed by: Alan Walker, Ava Max',
        url: "https://myawsbucket-ahv.s3.us-west-1.amazonaws.com/Alan+Walker+-+Alone.mp3",
        imageUrl: 'https://i1.sndcdn.com/artworks-000647913412-ckdhxi-t500x500.jpg',
      },
      {
        artistId: 2,
        albumId: 4,
        title: 'On My Way',
        description: 'Performed by: Alan Walker, Farruko, Sabrina Carpenter',
        url: "https://myawsbucket-ahv.s3.us-west-1.amazonaws.com/Alan+Walker%2C+Sabrina+Carpenter+%26+Farruko++-+On+My+Way.mp3",
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
