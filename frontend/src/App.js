// frontend/src/App.js
import React, { useState, useEffect } from "react";
import { useDispatch } from "react-redux";
import { Route, Switch, Redirect } from "react-router-dom";
import LoginFormPage from "./components/LoginFormPage";
import SignupFormPage from "./components/SignupFormPage";
import * as sessionActions from "./store/session";
import Navigation from "./components/Navigation";
import SongList from "./components/SongList/SongList";
import UserSongList from "./components/UserSongList/UserSongList";
import CreateSong from "./components/CreateSong/CreateSong";
import DeleteSong from "./components/DeleteSong/DeleteSong";
import EditSong from "./components/EditSong/EditSong";
import SongDetails from "./components/SongDetails/SongDetails";
import DeleteComment from "./components/DeleteComment/DeleteComment";

function App() {
  const dispatch = useDispatch();
  const [isLoaded, setIsLoaded] = useState(false);
  useEffect(() => {
    dispatch(sessionActions.restoreUser()).then(() => setIsLoaded(true)); //returns either user object or empty object, initial state has user set to null instead of empty object in store/session.js
  }, [dispatch]);

  return (
    <>
      <Navigation isLoaded={isLoaded} />
      {isLoaded && (
        <Switch>
          <Route exact path="/">
            <Redirect to='/songs' />
          </Route>
          <Route path="/login">
            <LoginFormPage />
          </Route>
          <Route path="/signup">
            <SignupFormPage />
          </Route>
          <Route path='/songs/:songId/comments/:commentId/delete'>
            <DeleteComment />
          </Route>
          <Route path='/songs/:songId/delete'>
            <DeleteSong />
          </Route>
          <Route path='/songs/:songId/edit'>
            <EditSong />
          </Route>
          <Route path='/songs/:songId/details'>
            <SongDetails />
          </Route>
          <Route path='/songs/current'>
            <UserSongList />
          </Route>
          <Route path='/songs/create'>
            <CreateSong />
          </Route>
          <Route exact path='/songs'>
            <SongList />
          </Route>
        </Switch>
      )}
    </>
  );
}

export default App;
