import { csrfFetch } from "./csrf";

// TYPE
const GET_SEARCHED_GIFS = 'gifs/allSearchedGifs';


const getAllSearchedGifs = (gifs) => {
    return {
        type: GET_SEARCHED_GIFS,
        payload: gifs
    }
}


// GET ALL SEARCHED GIFS
export const getAllSearchedGifsBackend = (query) => async (dispatch) => {
    const res = await csrfFetch(`/api/tweets/search/${query}`);
    const parsedRes = await res.json();
    dispatch(getAllSearchedGifs(parsedRes));
}



const initialState = { allGifs: {}, currentGif: {} }

//REDUCER
const gifReducer = (state = initialState, action) => {
    switch (action.type) {
        case GET_SEARCHED_GIFS:
            const searchedGifsState = { ...state };
            searchedGifsState.allGifs = {};

            action.payload.forEach((gif, index) => {
                searchedGifsState.allGifs[index] = gif
            })

            return searchedGifsState;

        default:
            return state;
    }
}

export default gifReducer;
