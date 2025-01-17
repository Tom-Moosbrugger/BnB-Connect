import { csrfFetch } from "./csrf"
import { createSelector } from 'reselect';

// action constants

const LOAD_SPOTS = 'spots/loadSpots';
const CREATE_SPOT = 'spots/createSpot'
const UPDATE_SPOT = 'spots/updateSpot';
const DELETE_SPOT = 'spots/deleteSpot';
const ADD_SPOT_REVIEWS = 'spots/addSpotReviews';
const DELETE_SPOT_REVIEW = 'spots/deleteSpotReview';
const EDIT_SPOT_REVIEW = 'spots/editSpotReview';

// action functions

const loadSpots = (spots) => {
    return {
        type: LOAD_SPOTS,
        spots
    }
}

const createSpot = (spot) => {
    return {
        type: CREATE_SPOT,
        spot
    }
}

const updateSpot = (spot) => {
    return {
        type: UPDATE_SPOT,
        spot
    }
}

const deleteSpot = (spotId) => {
    return {
        type: DELETE_SPOT,
        spotId
    }
}

const addSpotReviews = (reviews, spotId) => {
    return {
        type: ADD_SPOT_REVIEWS,
        reviews,
        spotId
    }
}

const editSpotReview = (review, reviewId, spotId) => {
    return {
        type: EDIT_SPOT_REVIEW,
        review,
        reviewId,
        spotId,
        
    }
}

const deleteSpotReview = (reviewId, spotId) => {
    return {
        type: DELETE_SPOT_REVIEW,
        reviewId,
        spotId
    }
}

// thunk actions

export const loadSpotsThunk = () => async dispatch => {
    const response = await csrfFetch('/api/spots');

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

    dispatch(loadSpots(spots));

    return response;
}

export const getSpotDetailsThunk = (spotId) => async dispatch => {
    const response = await csrfFetch(`/api/spots/${spotId}`);

    const data = await response.json();

    const updatedSpot = { ...data };

    if (typeof updatedSpot.price === "number") {
        updatedSpot.price = updatedSpot.price.toFixed(2);
    }

    if (updatedSpot.avgStarRating !== null && typeof updatedSpot.avgStarRating === "number") {
        updatedSpot.avgStarRating = updatedSpot.avgStarRating.toFixed(1);
    } else if (updatedSpot.avgStarRating !== null && typeof updatedSpot.avgStarRating === "string") {
        updatedSpot.avgStarRating = Number(updatedSpot.avgStarRating || 0).toFixed(1);
    }

    console.log('\nDATA\n', updatedSpot);

    dispatch(updateSpot(updatedSpot));

    return response;
}

export const createSpotThunk = (spot) => async dispatch => {
    const response = await csrfFetch(`/api/spots/`, {
        method: 'POST',
        body: JSON.stringify(spot)
    });

    const data = await response.json();

    dispatch(createSpot(data));

    return data;
}

export const editSpotThunk = (spot, spotId) => async dispatch => {
    const response = await csrfFetch(`/api/spots/${spotId}`, {
        method: 'PUT',
        body: JSON.stringify(spot)
    });

    const data = await response.json();

    dispatch(updateSpot(data));

    return response;
}

export const deleteSpotThunk = (spotId) => async dispatch => {
    const response = await csrfFetch(`/api/spots/${spotId}`, {
        method: 'DELETE'
    });

    dispatch(deleteSpot(spotId));

    return response;
}

export const addSpotImagesThunk = (spotImages, spotId) => async () => {
    for (let image of spotImages) {
        await csrfFetch(`/api/spots/${spotId}/images`, {
            method: 'POST',
            body: JSON.stringify(image)
        });
    }

    return;
}

export const getSpotReviewsThunk = (spotId) => async dispatch => {
    const response = await csrfFetch(`/api/spots/${spotId}/reviews`);

    const data = await response.json();

    dispatch(addSpotReviews(data.Reviews, spotId));

    return response;
}

export const createSpotReviewThunk = (review, spotId) => async () => {
    const response = await csrfFetch(`/api/spots/${spotId}/reviews`, {
        method: 'POST',
        body: JSON.stringify(review)
    });

    return response;
}

export const editSpotReviewThunk = (review, reviewId, spotId) => async dispatch => {
    const response = await csrfFetch(`/api/reviews/${reviewId}`, {
        method: 'PUT',
        body: JSON.stringify(review)
    });

    const data = await response.json();

    console.log('DATA', data)

    dispatch(editSpotReview(data, reviewId, spotId));

    return response;
}

export const deleteSpotReviewThunk = (reviewId, spotId) => async dispatch => {
    const response = await csrfFetch(`/api/reviews/${reviewId}`, {
        method: 'DELETE'
    });

    dispatch(deleteSpotReview(reviewId, spotId));

    return response;
}

// selectors

const selectSpots = state => state.spots

export const selectSpotsArray = createSelector(selectSpots, (spots) => Object.values(spots));

const getSpotById = (state, spotId) => state.spots[spotId];

export const getSpotReviews = createSelector(
  [getSpotById],
  (spot) => spot?.reviews || []
);

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
        case CREATE_SPOT:
            return { ...state, [action.spot.id]: action.spot};
        case UPDATE_SPOT:
            return { 
                ...state, 
                [action.spot.id]: { 
                    ...state[action.spot.id], ...action.spot 
                }
            };
        case DELETE_SPOT: {
            const { [action.spotId]: _, ...newState } = state;
            console.log(_);
            return newState;
        }  
        case ADD_SPOT_REVIEWS: {
            const reviews = [...action.reviews].sort((a, b) => {
                const dateA = new Date(a.createdAt);
                const dateB = new Date(b.createdAt);
    
                return dateB - dateA;
            });

            for (let review of reviews) {
                let monthYear = new Date(review.createdAt);
                
                review.dateString = monthYear.toLocaleDateString("en-US", {
                    timeZone: 'UTC',
                    month: "long",
                    year: "numeric"
                  });
            }

            return { 
                ...state, 
                [action.spotId]: { 
                    ...state[action.spotId], reviews 
                }
            };
        }  
        case EDIT_SPOT_REVIEW:
            return {
                ...state,
                [action.spotId]: {
                    ...state[action.spotId],
                    reviews: state[action.spotId].reviews.map(review => 
                        review.id === action.reviewId ? { ...review, ...action.review } : review
                    )
                }
            };
        case DELETE_SPOT_REVIEW:
            state[8]
            return { 
                ...state, 
                [action.spotId]: { 
                    ...state[action.spotId], 
                    reviews: state[action.spotId].reviews.filter(review => 
                        review.id !== action.reviewId
                    ) 
                }
            };
        default:
            return state;
    }
}

export default spotsReducer;