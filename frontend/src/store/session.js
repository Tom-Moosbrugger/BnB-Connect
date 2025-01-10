import { csrfFetch } from "./csrf";

// action constants

const SET_USER = 'session/setUser';
const REMOVE_USER = 'session/removeUser';

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

export const restoreUserThunk = () => async dispatch => {
    const response = await csrfFetch('/api/session');

    const data = await response.json();

    dispatch(setUser(data.user));

    return response;
}

// reducer

const sessionReducer = (state = { user: null }, action) => {
    switch(action.type) {
        case SET_USER:
            return { ...state, user: action.user };
        case REMOVE_USER: 
            return { ...state, user: null };
        default:
            return state;
    }
}

export default sessionReducer;

// store.dispatch(window.sessionActions.setUserThunk({ credential: 'demo@user.io', password: 'password' }));