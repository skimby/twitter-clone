import { csrfFetch } from "./csrf";

// TYPE
const GET_FOLLOWING = 'follow/getFollowing'
const CREATE_FOLLOW = 'follow/createFollow'
// const EDIT_COMMENT = 'comments/editComment'
const DELETE_FOLLOW = 'follow/deleteFollow'


// ACTION
const getFollowing = (follows) => {
    return {
        type: GET_FOLLOWING,
        payload: follows
    }
}
const createFollow = (follow, userId) => {
    return {
        type: CREATE_FOLLOW,
        payload: follow,
        userId: userId
    }
}
// const editComment = (comment) => {
//     return {
//         type: EDIT_COMMENT,
//         payload: comment
//     }
// }

const deleteFollow = (follow, userId) => {
    return {
        type: DELETE_FOLLOW,
        payload: follow,
        userId: userId
    }
}

// THUNK

// GET FOLLOWING
export const getFollowingBackend = (userId) => async (dispatch) => {

    const res = await csrfFetch(`/api/follows/users/${userId}/following`);

    if (res.ok) {
        const parsedRes = await res.json();
        dispatch(getFollowing(parsedRes));
    }
}

// CREATE FOLLOW
export const createFollowBackend = (userId, userPageId) => async (dispatch) => {
    const res = await csrfFetch(`/api/follows/users/${userPageId}/follow`, {
        method: "POST",
        body: JSON.stringify({
            userId: userId,
            followerId: userPageId
        })
    });
    if (res.ok) {
        const parsedRes = await res.json();
        dispatch(createFollow(parsedRes, userId));
    }
}
// DELETE TWEET
export const deleteFollowBackend = (userId, userPageId) => async (dispatch) => {
    const res = await csrfFetch(`/api/follows/users/${userPageId}/unfollow`, {
        method: 'DELETE'
    });
    if (res.ok) {
        const parsedRes = await res.json();
        dispatch(deleteFollow(parsedRes, userId));
    }
}

// // EDIT TWEET
// export const editCommentBackend = (commentId, commentInput, tweetId) => async (dispatch) => {
//     console.log(commentId, tweetId, commentInput)

//     const res = await csrfFetch(`/api/comments/${commentId}/tweets/${tweetId}`, {
//         method: "PUT",
//         body: JSON.stringify(commentInput)
//     });
//     if (res.ok) {
//         const parsedRes = await res.json();
//         dispatch(editComment(parsedRes));
//     }
// }





//REDUCER
const initialState = { following: {}, followers: {}, loggedUserFollowing: {} }

const followsReducer = (state = initialState, action) => {
    switch (action.type) {
        case GET_FOLLOWING:
            const getFollowingState = { ...state };
            getFollowingState.following = {};
            action.payload.Following.forEach(follow => {
                getFollowingState.following[follow.id] = follow;
            })
            return getFollowingState;
        case CREATE_FOLLOW:
            const createFollowState = { ...state };
            if (action.userId === action.payload.id) {
                createFollowState.loggedUserFollowing[action.payload.id] = action.payload
            }
            createFollowState.following[action.payload.id] = action.payload

            return createFollowState;

        // case EDIT_COMMENT:
        //     const editCommentState = { ...state };

        //     editCommentState[action.payload.id] = action.payload

        //     return editCommentState;

        case DELETE_FOLLOW:
            const deleteFollowState = { ...state };
            delete deleteFollowState.following[action.payload.id]

            if (action.userId === action.payload.id) {
                delete deleteFollowState.loggedUserFollowing[action.payload.id]
            }
            return deleteFollowState;

        default:
            return state;
    }
}

export default followsReducer;
