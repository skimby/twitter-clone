import { csrfFetch } from "./csrf";

// TYPE
const GET_COMMENTS = 'comments/getComments'
const CREATE_COMMENT = 'comments/createComment'
const EDIT_COMMENT = 'comments/editComment'
const DELETE_COMMENT = 'comments/deleteComment'


// ACTION
const createComment = (comment) => {
    return {
        type: CREATE_COMMENT,
        payload: comment
    }
}
const getComments = (comments) => {
    return {
        type: GET_COMMENTS,
        payload: comments
    }
}
const editComment = (comment) => {
    return {
        type: EDIT_COMMENT,
        payload: comment
    }
}

const deleteComment = (comment) => {
    return {
        type: DELETE_COMMENT,
        payload: comment
    }
}

// THUNK

// GET COMMENTS
export const getCommentsBackend = (tweetId) => async (dispatch) => {
    const res = await csrfFetch(`/api/comments/tweets/${tweetId}`);

    if (res.ok) {
        const parsedRes = await res.json();
        dispatch(getComments(parsedRes));
    }
}

// CREATE COMMENT
export const createCommentBackend = (tweetId, commentInput) => async (dispatch) => {
    const { comment, image, gif } = commentInput;

    const formData = new FormData();
    formData.append("comment", comment);

    if (gif) formData.append("gif", gif);
    if (image) formData.append("image", image);

    const res = await csrfFetch(`/api/comments/tweets/${tweetId}`, {
        method: "POST",
        headers: {
            "Content-Type": "multipart/form-data",
        },
        body: formData
    });
    if (res.ok) {
        const parsedRes = await res.json();
        dispatch(createComment(parsedRes));
    }
}

// EDIT COMMENT
export const editCommentBackend = (commentId, commentInput, tweetId) => async (dispatch) => {

    const res = await csrfFetch(`/api/comments/${commentId}/tweets/${tweetId}`, {
        method: "PUT",
        body: JSON.stringify(commentInput)
    });
    if (res.ok) {
        const parsedRes = await res.json();
        dispatch(editComment(parsedRes));
    }
}

// DELETE TWEET
export const deleteCommentBackend = (commentId, tweetId) => async (dispatch) => {
    const res = await csrfFetch(`/api/comments/${commentId}/tweets/${tweetId}`, {
        method: 'DELETE'
    });
    if (res.ok) {
        const parsedRes = await res.json();
        dispatch(deleteComment(parsedRes));
    }
}



//REDUCER
const initialState = {}

const commentsReducer = (state = initialState, action) => {
    switch (action.type) {
        case GET_COMMENTS:
            const getCommentsState = { ...state };
            action.payload.Comments.forEach(comment => {
                getCommentsState[comment.id] = comment;
            })

            return getCommentsState;
        case CREATE_COMMENT:
            const createCommentState = { ...state };
            createCommentState[action.payload.id] = action.payload

            return createCommentState;

        case EDIT_COMMENT:
            const editCommentState = { ...state };

            editCommentState[action.payload.id] = action.payload

            return editCommentState;

        case DELETE_COMMENT:
            const deleteCommentState = { ...state };
            delete deleteCommentState[action.payload.id]

            return deleteCommentState;

        default:
            return state;
    }
}

export default commentsReducer;
