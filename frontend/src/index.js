import React from 'react';
import './index.css';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import { BrowserRouter } from 'react-router-dom';
import App from './App';
import configureStore from './store';
import { restoreCSRF, csrfFetch } from './store/csrf';
import * as sessionActions from './store/session';
import Favicon from 'react-favicon'
import { MusicPlayerProvider } from './components/MusicPlayerContext/MusicPlayerContext';
import { Modal, ModalProvider } from './components/context/Modal';

const store = configureStore();

if (process.env.NODE_ENV !== 'production') {
  restoreCSRF();

  window.csrfFetch = csrfFetch;
  window.store = store;
  window.sessionActions = sessionActions;
}

function Root() {
  return (
    <ModalProvider>
      <Provider store={store}>
        <BrowserRouter>
          <MusicPlayerProvider>
            <App />
            <Modal />
          </MusicPlayerProvider>
        </BrowserRouter>
      </Provider>
    </ModalProvider>
  );
}

ReactDOM.render(
  <React.StrictMode>
    {/* <Favicon url='https://cdn.icon-icons.com/icons2/2619/PNG/256/among_us_soundcloud_icon_156929.png' /> */}
    <Root />
  </React.StrictMode>,
  document.getElementById('root'),
);
