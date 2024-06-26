// frontend/src/store/session.js
import { csrfFetch } from './csrf';

const SET_USER = 'session/setUser';
const REMOVE_USER = 'session/removeUser';

export const restoreUser = () => async dispatch => {
    const response = await csrfFetch('/api/session');
    const data = await response.json();
    dispatch(setUser(data));
    return response;
};

export const setUser = (user) => {
    return {
        type: SET_USER,
        payload: user,
    };
};

export const removeUser = () => {
    return {
        type: REMOVE_USER,
    };
};

export const login = (user) => async (dispatch) => {
    const { credential, password } = user;
    const response = await csrfFetch('/api/session', {
        method: 'POST',
        body: JSON.stringify({
            credential,
            password,
        }),
    });
    const data = await response.json();
    dispatch(setUser(data));
    return response;
};

const initialState = { user: {} }; //user can be set to empty object {} or null

const sessionReducer = (state = initialState, action) => {
    let newState;
    switch (action.type) {
        case SET_USER:
            newState = Object.assign({}, state);
            newState.user = action.payload;
            return newState;
        case REMOVE_USER:
            newState = Object.assign({}, state);
            newState.user = {};
            return newState;
        default:
            return state;
    }
};

export const signup = (user) => async (dispatch) => {
    const { images, image, firstName, lastName, username, email, password } = user;
    const formData = new FormData();
    formData.append("firstName", firstName);
    formData.append("lastName", lastName);
    formData.append("username", username);
    formData.append("email", email);
    formData.append("password", password);

    // for multiple files
    // if (images && images.length !== 0) {
    //     for (var i = 0; i < images.length; i++) {
    //         formData.append("images", images[i]);
    //     }
    // }

    // for single file
    if (image) formData.append("image", image);

    const response = await csrfFetch("/api/users", {
        method: "POST",
        headers: {
            "Content-Type": "multipart/form-data",
        },
        body: formData,
        // body: JSON.stringify({
        //     firstName,
        //     lastName,
        //     username,
        //     email,
        //     password,
        // }),
    });
    const data = await response.json();
    dispatch(setUser(data));
    return response;
};

export const logout = () => async (dispatch) => {
    const response = await csrfFetch('/api/session', {
        method: 'DELETE',
    });
    dispatch(removeUser());
    return response;
};

export default sessionReducer;
