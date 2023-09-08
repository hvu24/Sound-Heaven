// frontend/src/store/index.js
import { createStore, combineReducers, applyMiddleware, compose } from 'redux';
import thunk from 'redux-thunk';
import sessionReducer from './session';
import songReducer from './songsReducer';
import userSongReducer from './userSongsReducer'
import songDetailsReducer from './songDetailsReducer';
import commentsReducer from './commentsReducer'
import userPlaylistReducer from './userPlaylistsReducer';
import playlistDetailsReducer from './playlistDetailsReducer';

const rootReducer = combineReducers({
    session: sessionReducer,
    songReducer,
    userSongReducer,
    songDetailsReducer,
    commentsReducer,
    userPlaylistReducer,
    playlistDetailsReducer
});

let enhancer;

if (process.env.NODE_ENV === 'production') {
    enhancer = applyMiddleware(thunk);
} else {
    const logger = require('redux-logger').default;
    const composeEnhancers =
        window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;
    enhancer = composeEnhancers(applyMiddleware(thunk, logger));
}

const configureStore = (preloadedState) => {
    return createStore(rootReducer, preloadedState, enhancer);
};

export default configureStore;
