import { csrfFetch } from './csrf';

export const loadComments = (comments) => {
    return {
        type: 'LOAD_COMMENTS',
        comments
    }
}

export const deleteComment = (id) => {
    return {
        type: 'DELETE_COMMENT',
        id
    };
};

export const addComment = (comment) => {
    return {
        type: 'CREATE_COMMENT',
        comment,
    };
};

export const loadAllComments = (songId) => async (dispatch) => {
    try {
        const response = await csrfFetch(`/api/songs/${songId}/comments`);
        const commentsObj = await response.json();
        const commentsArr = commentsObj.comments
        dispatch(loadComments(commentsArr))
    } catch (response) {
        if (!response.ok) {
            dispatch(loadComments([]))
        }
    }
};

export const removeComment = (commentId) => async (dispatch) => {
    const response = await csrfFetch(`/api/comments/${commentId}`, {
        method: 'DELETE',
    });
    dispatch(deleteComment(commentId));
    return response;
};

export const createComment = (comment) => async (dispatch) => {
    const { body, songId, userName, userId } = comment;
    const response = await csrfFetch(`/api/songs/${songId}/comments`, {
        method: "POST",
        body: JSON.stringify({
            body
        }),
    });
    const User = {
        id: userId,
        username: userName
    }
    const data = await response.json();
    data.User = User
    dispatch(addComment(data));
    return response;
};

const initialState = {};

const commentReducer = (state = initialState, action) => {
    let newState = { ...state };
    switch (action.type) {
        case 'DELETE_COMMENT':
            delete newState[action.id]
            return newState
        case 'LOAD_COMMENTS':
            newState = {}
            if (action.comments.length > 0) {
                action.comments.forEach(comment => {
                    newState[comment.id] = comment
                })
            }
            return newState;
        case 'CREATE_COMMENT':
            newState[action.comment.id] = action.comment
            return newState;
        default:
            return state;
    }
};

export default commentReducer
