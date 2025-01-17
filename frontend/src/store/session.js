import { csrfFetch } from "./csrf";

// action constants

const SET_USER = 'session/setUser';
const REMOVE_USER = 'session/removeUser';
const ADD_USER_SPOTS = 'session/addUserSpots';
const DELETE_USER_SPOT = 'session/deleteUserSpot';

// regular actions

const setUser = (user) => {
    return {
        type: SET_USER,
        user
    }
};

const removeUser = () => {
    return {
        type: REMOVE_USER
    }
};

const addUserSpots = (spots) => {
    return {
        type: ADD_USER_SPOTS,
        spots
    }
}

export const deleteUserSpot = (spotId) => {
    return {
        type: DELETE_USER_SPOT,
        spotId
    }
}

// thunk actions

export const loginThunk = (credentials) => async dispatch => {
    const response = await csrfFetch('/api/session', {
        method: 'POST',
        body: JSON.stringify(credentials)
    });

    const data = await response.json();

    dispatch(setUser(data.user));

    return response;
}

export const logoutThunk = () => async dispatch => {
    const response = csrfFetch('/api/session', { method: 'DELETE' });

    dispatch(removeUser());

    return response;
};

export const restoreUserThunk = () => async dispatch => {
    const response = await csrfFetch('/api/session');

    const data = await response.json();

    dispatch(setUser(data.user));

    return response;
};

export const signupUserThunk = (userInfo) => async dispatch => {
    const response = await csrfFetch('/api/users', {
        method: 'POST',
        body: JSON.stringify(userInfo)
    });

    const data = await response.json();

    dispatch(setUser(data.user));

    return response;
}

export const addUserSpotsThunk = () => async dispatch => {
    const response = await csrfFetch('/api/spots/current');

    const data = await response.json();

    const spots = data.Spots.map(spot => {
        const updatedSpot = { ...spot };

        if (typeof updatedSpot.price === "number") {
            updatedSpot.price = updatedSpot.price.toFixed(2);
        }

        if (updatedSpot.avgRating !== null && typeof updatedSpot.avgRating === "number") {
            updatedSpot.avgRating = updatedSpot.avgRating.toFixed(1);
        } else if (updatedSpot.avgRating !== null && typeof updatedSpot.avgRating === "string") {
            updatedSpot.avgRating = Number(updatedSpot.avgRating || 0).toFixed(1);
        }

        return updatedSpot;
    });

    dispatch(addUserSpots(spots));

    return response;
}

// reducer

const sessionReducer = (state = { user: null }, action) => {
    switch(action.type) {
        case SET_USER:
            return { ...state, user: action.user };
        case REMOVE_USER: 
            return { ...state, user: null };
        case ADD_USER_SPOTS:
            return {...state, user: { ...state.user, spots: action.spots }}
        case DELETE_USER_SPOT:
            return { 
                ...state, 
                user: { ...state.user, spots: state.user.spots.filter(spot => spot.id !== action.spotId) } 
            };
        default:
            return state;
    }
}

export default sessionReducer;

// store.dispatch(window.sessionActions.setUserThunk({ credential: 'demo@user.io', password: 'password' }));