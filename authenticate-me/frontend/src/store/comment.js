import { csrfFetch } from "./csrf";

// TYPE
const GET_COMMENTS = 'comments/getComments'
const EDIT_COMMENT = 'comments/editComment'
const DELETE_COMMENT = 'comments/deleteComment'


// ACTION
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
    console.log(tweetId)
    const res = await csrfFetch(`/api/comments/tweets/${tweetId}`);

    if (res.ok) {
        const parsedRes = await res.json();
        dispatch(getComments(parsedRes));
    }
}

// EDIT TWEET
export const editCommentBackend = (commentId, commentInput, tweetId) => async (dispatch) => {
    console.log(commentId, tweetId, commentInput)

    const res = await csrfFetch(`/api/comments/${commentId}/tweets/${tweetId}`, {
        method: "PUT",
        body: JSON.stringify(commentInput)
    });
    if (res.ok) {
        const parsedRes = await res.json();
        dispatch(editComment(parsedRes));
    }
}

// // DELETE TWEET
// export const deleteTweetBackend = (tweetId) => async (dispatch) => {
//     const res = await csrfFetch(`/api/tweets/${tweetId}/delete`, {
//         method: 'DELETE'
//     });
//     if (res.ok) {
//         const parsedRes = await res.json();
//         dispatch(deleteTweet(parsedRes));
//     }
// }



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

        case EDIT_COMMENT:
            const editCommentState = { ...state };

            editCommentState[action.payload.id] = action.payload

            return editCommentState;

        // case DELETE_TWEET:
        //     const deleteTweetState = { ...state };
        //     delete deleteTweetState.feedTweets[action.payload.id]
        //     delete deleteTweetState.exploreTweets[action.payload.id]
        //     delete deleteTweetState.loggedUserTweets[action.payload.id]

        //     return deleteTweetState;


        default:
            return state;
    }
}

export default commentsReducer;
