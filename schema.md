Users{
    "id": 1,
    "lastName": "Smith",
    "email": "john.smith@gmail.com",
    "username": "JohnSmith",
    "password": "secret password"
    "firstName": "John",
};

Artists{
    "id": 1,
    "totalSongs": 10,
    "totalAlbums": 2,
    "previewImage": "image url"
    "username": "JohnSmith",
};

Albums {
    "id": 1,
    "userId": 1,
    "artistId": 1,
    "title": "Time",
    "description": "An album about time.",
    "previewImage": "image url",
    "imageUrl": "image url"
};

Songs {
    "id": 1,
    "userId": 1,
    "artistId":1,
    "albumId": 1,
    "title": "Yesterday",
    "description": "A song about the past.",
    "url": "audio url",
    "previewImage": "image url",
    "imageUrl": "image url"

};

Playlist{
    "id": 1,
    "userId": 1,
    "name": "Current Favorites",
    "previewImage": "image url",
    "imageUrl": "image url"
};

SongPlaylists{
    "id": 1,
    "playlistId": 1,
    "songId": 1
}

Comments{
    "id": 1,
    "userId": 1,
    "songId": 1,
    "body": "I love this song!",
}
