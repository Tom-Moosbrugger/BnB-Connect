import { useState } from "react";
import { useDispatch } from 'react-redux'
import { useModalContext } from "../../context/Modal";
import SpotReviewInput from './SpotReviewInput';
import * as spotActions from '../../store/spots';
import './SpotReviewModal.css';

const SpotReviewModal = ({ review, formType, spotId, spotName }) => {
    const [stars, setStars] = useState(review.stars);
    const [reviewText, setReviewText] = useState(review.review);
    const [errors, setErrors] = useState({});
    const { closeModal } = useModalContext();
    const dispatch = useDispatch();

    const click = (num) => {
        setStars(num);
    }

    const onSubmit = async e => {
        e.preventDefault();

        console.log('HELLO')

        const newReview = {
            review: reviewText,
            stars
        }

        if (formType === 'createReview') {
            await dispatch(spotActions.createSpotReviewThunk(newReview, spotId))
                .catch(async (res) => {
                    const data = await res.json();
                    if (data?.errors) setErrors(data.errors);
                }
            );

            await dispatch(spotActions.getSpotDetailsThunk(spotId))
                .catch(async (res) => {
                    const data = await res.json();
                    if (data?.errors) setErrors(data.errors);
                }
            );

            await dispatch(spotActions.getSpotReviewsThunk(spotId))
                .catch(async (res) => {
                    const data = await res.json();
                    if (data?.errors) setErrors(data.errors);
                }
            );
        } else {
            await dispatch(spotActions.editSpotReviewThunk(newReview, review.id, spotId))
                .catch(async (res) => {
                    const data = await res.json();
                    if (data?.errors) setErrors(data.errors);
                }
            );
        }

        closeModal();
    }

    return (
        <form className="spot-review-form">
            <header>
                {formType === 'createReview' && <h2>How was your stay?</h2>}
                {formType === 'editReview' &&
                <>
                    <h2>How was your stay at</h2>
                    <h2>{spotName}?</h2>
                </>}
            </header>
            {errors.review &&
            <div className="spot-review-errors-div">
                 <p>{errors.review}</p>
            </div>}
            <textarea 
            placeholder="Leave your review here..."
            rows={6}
            value={reviewText}
            onChange={e => setReviewText(e.target.value)}
            />
           
            <SpotReviewInput 
            click={click} 
            stars={stars}
            disabled={false}
            />
            {errors.stars &&
            <div className="spot-review-errors-div">
                 <p>{errors.stars}</p>
            </div>}
            <button
            className={(reviewText.length < 10 || stars === 0) ? `submit-review-button disabled` : `submit-review-button`} 
            type="submit" 
            disabled={(reviewText.length < 10 || stars === 0)}
            onClick={onSubmit}
            >
                Submit Your Review
            </button>
        </form>
    );
};

export default SpotReviewModal