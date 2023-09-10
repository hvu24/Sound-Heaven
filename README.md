# `<Sound Heaven>`
Sound Heaven is my first attempt at creating a working website hosted on the web that allows users to play and host music online.

### Screenshots
##### Song Detail
![song_detail]
##### User Songs
![user_songs]

[song_detail]: ./SoundCloud.jpg
[user_songs]: ./usersongs.png

### Features
* Songs
  * Show all songs in database
  * Create new song
  * Edit existing song
  * Delete existing song
  * Show only songs of currently logged in user
  * Show details of a specific song

* Comments
  * Show all comments for a specific song
  * Create new comment for a song
  * Delete an existing comment

### Technologies Used
* Node.js
* Express
* Sequelize
* Sqlite3
* React
* Redux
* Html5
* Css
* Git
* Javascript


### Setting up the application
* Click the green dropdown menu called "<> Code" and copy the url "https://github.com/hvu24/SoundCloud.git"
* Open up a terminal and navigate to the folder you would like the files to be in
* Type git clone then hit space and paste the url "git clone https://github.com/hvu24/SoundCloud.git" into your terminal and press enter
* Go to Amazon web services and set up an s3 bucket
* Make a .env file in the backend folder and copy paste the following code or copy the .env.example file:
    ```json
      PORT=8000
      DB_FILE=db/dev.db
      JWT_SECRET=eg3vq68LQHbLAw==
      JWT_EXPIRES_IN=604800
      SCHEMA=sound_cloud
      AWS_ACCESS_KEY_ID=KEYHERE
      AWS_SECRET_ACCESS_KEY=KEYHERE
    ```
* Navigate to frontend folder through your terminal and type "npm install" then press enter
* Navigate to db folder in backend folder through your terminal and make a file called dev.db
* Navigate to backend folder through your terminal and type "npm install" then press enter
* Navigate to backend folder through your terminal and type "npm run rebuild" then press enter, your backend should now be started
* Open a separate terminal and navigate to your frontend folder then type "npm start" to start your frontend
