import { csrfFetch } from "./csrf"
import { createSelector } from 'reselect';

// action constants

const LOAD_SPOTS = 'spots/loadSpots';
const UPDATE_SPOT = 'spots/updateSpot';
const ADD_SPOT_REVIEWS = 'spots/addSpotReviews';

// action functions

const loadSpots = (spots) => {
    return {
        type: LOAD_SPOTS,
        spots
    }
}

const updateSpot = (spot) => {
    return {
        type: UPDATE_SPOT,
        spot: spot
    }
}

const addSpotReviews = (reviews, spotId) => {
    return {
        type: ADD_SPOT_REVIEWS,
        spotId,
        reviews
    }
}

// thunk actions

export const loadSpotsThunk = () => async dispatch => {
    const response = await csrfFetch('/api/spots');

    const data = await response.json();

    dispatch(loadSpots(data.Spots));

    return response;
}

export const getSpotDetailsThunk = (id) => async dispatch => {
    const response = await csrfFetch(`/api/spots/${id}`);

    const data = await response.json();

    dispatch(updateSpot(data));

    return response;
}

export const getSpotReviewsThunk = (id) => async dispatch => {
    const response = await csrfFetch(`/api/spots/${id}/reviews`);

    const data = await response.json();

    dispatch(addSpotReviews(data.Reviews, id));

    return response;
}

// selectors

const selectSpots = state => state.spots

export const selectSpotsArray = createSelector(selectSpots, (spots) => Object.values(spots));

// reducer

const spotsReducer = (state = {}, action) => {
    switch (action.type) {
        case LOAD_SPOTS: {
            const newState = action.spots.reduce((acc, spot) => {
                acc[spot.id] = spot;
                return acc;
            }, {});

            return newState;
        }
        case UPDATE_SPOT:
            return { ...state, [action.spot.id]: { ...state[action.spot.id], ...action.spot }};
        case ADD_SPOT_REVIEWS: {
            return { ...state, [action.spotId]: { ...state[action.spotId], reviews: action.reviews }};
        }
            
        default:
            return state;
    }
}

export default spotsReducer;