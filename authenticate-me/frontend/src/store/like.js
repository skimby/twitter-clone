import { csrfFetch } from "./csrf";

// TYPE
const LIKE = 'likes/like'
const GET_LIKES = 'likes/getLikes'
// const GET_LOGGED_USER_FOLLOWING = 'follow/getLoggedUserFollowing'
// const CREATE_FOLLOW = 'follow/createFollow'
// const DELETE_FOLLOW = 'follow/deleteFollow'


// ACTION
const createLike = (like) => {
    return {
        type: LIKE,
        payload: like
    }
}
const getLikes = (likes) => {
    return {
        type: GET_LIKES,
        payload: likes
    }
}
// const getLoggedUserFollowing = (follows) => {
//     return {
//         type: GET_LOGGED_USER_FOLLOWING,
//         payload: follows
//     }
// }
// const createFollow = (follow, userId) => {
//     return {
//         type: CREATE_FOLLOW,
//         payload: follow,
//         userId: userId
//     }
// }
// const editComment = (comment) => {
//     return {
//         type: EDIT_COMMENT,
//         payload: comment
//     }
// }

// const deleteFollow = (follow, userId, isOwnPage) => {
//     return {
//         type: DELETE_FOLLOW,
//         payload: follow,
//         userId: userId,
//         isOwnPage: isOwnPage
//     }
// }

// THUNK


// CREATE LIKES
export const createLikeBackend = (tweetId) => async (dispatch) => {

    const res = await csrfFetch(`/api/likes/tweets/${tweetId}`, {
        method: "POST",
        body: JSON.stringify()
    });
    if (res.ok) {
        const parsedRes = await res.json();
        dispatch(createLike(parsedRes));
    }
}

// GET LIKES
export const getLikesBackend = (tweetId) => async (dispatch) => {

    const res = await csrfFetch(`/api/likes/tweets/${tweetId}`);

    if (res.ok) {
        const parsedRes = await res.json();
        dispatch(getLikes(parsedRes));
    }
}

// // GET FOLLOWING
// export const getFollowersBackend = (userId, isOwnPage) => async (dispatch) => {

//     const res = await csrfFetch(`/api/follows/users/${userId}/followers`);

//     if (res.ok) {
//         const parsedRes = await res.json();
//         dispatch(getFollowers(parsedRes, isOwnPage));
//     }
// }

// // GET LOGGED USER FOLLOWING
// export const getLoggedUserFollowingBackend = () => async (dispatch) => {

//     const res = await csrfFetch(`/api/follows/users/me`);

//     if (res.ok) {
//         const parsedRes = await res.json();
//         dispatch(getLoggedUserFollowing(parsedRes));
//     }
// }

// // CREATE FOLLOW
// export const createFollowBackend = (userId, userPageId) => async (dispatch) => {

//     const res = await csrfFetch(`/api/follows/users/${userPageId}/follow`, {
//         method: "POST",
//         body: JSON.stringify({
//             userId: userId,
//             followerId: parseInt(userPageId)
//         })
//     });
//     if (res.ok) {
//         const parsedRes = await res.json();
//         dispatch(createFollow(parsedRes, userId));
//     }
// }
// // DELETE TWEET
// export const deleteFollowBackend = (userId, userPageId, isOwnPage) => async (dispatch) => {
//     const res = await csrfFetch(`/api/follows/users/${userPageId}/unfollow`, {
//         method: 'DELETE'
//     });
//     if (res.ok) {
//         const parsedRes = await res.json();
//         dispatch(deleteFollow(parsedRes, userId, isOwnPage));
//     }
// }



//REDUCER
const initialState = { tweet: {}, comment: {} }

const likesReducer = (state = initialState, action) => {
    switch (action.type) {
        case GET_LIKES:
            const getLikesState = { ...state };
            getLikesState.tweet = {};
            action.payload.forEach(like => {
                getLikesState.tweet[like.id] = like;
            })
            return getLikesState;

        case LIKE:
            const likeState = { ...state };
            likeState.tweet[action.payload.id] = action.payload

            return likeState;

        // case DELETE_FOLLOW:
        //     const deleteFollowState = { ...state };
        //     delete deleteFollowState.loggedUserFollowing[action.payload.id]

        //     if (action.isOwnPage) {
        //         delete deleteFollowState.following[action.payload.id]
        //     }
        //     return deleteFollowState;

        default:
            return state;
    }
}

export default likesReducer;
