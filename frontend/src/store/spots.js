import { csrfFetch } from "./csrf"

// action constants

const LOAD_SPOTS = 'spots/loadSpots'

// action functions

const loadSpots = (spots) => {
    return {
        type: LOAD_SPOTS,
        spots
    }
}

// thunk actions

export const loadSpotsThunk = () => async dispatch => {
    const response = await csrfFetch('/api/spots');

    const data = await response.json();

    dispatch(loadSpots(data.Spots));

    return response;
}

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
        default:
            return state;
    }
}

export default spotsReducer;