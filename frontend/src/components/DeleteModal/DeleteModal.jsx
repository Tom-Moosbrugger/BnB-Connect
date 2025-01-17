import { useState } from "react";
import { useModalContext } from "../../context/Modal";
import { useDispatch } from 'react-redux';
import * as spotActions from '../../store/spots';
import * as sessionActions from '../../store/session'
import './DeleteModal.css';

const DeleteSpotModal = ({ spotId, formType, reviewId }) => {
    const [errors, setErrors] = useState({});
    const dispatch = useDispatch();
    const { closeModal } = useModalContext();

    const handleClick = async (e) => {
        e.stopPropagation();

        if (formType === 'deleteSpot') {
            await dispatch(spotActions.deleteSpotThunk(spotId))
                .catch(async (res) => {
                    const data = await res.json();
                    if (data?.message) setErrors(data);
                }
            );


            dispatch(sessionActions.deleteUserSpot(spotId));
        } else {
            await dispatch(spotActions.deleteSpotReviewThunk(reviewId, spotId))
                .catch(async (res) => {
                    const data = await res.json();
                    if (data?.message) setErrors(data);
                }
            );
        }

        closeModal();
    }

    const content = 'Are you sure you want to ' + (formType === 'deleteSpot' ? 'remove this spot from this listings?' : 'delete this review?');
    const yesButton = 'Yes (Delete ' + (formType === 'deleteSpot' ? 'Spot)' : 'Review)');
    const noButton = 'No (Keep ' + (formType === 'deleteSpot' ? 'Spot)' : 'Review)');

    return (
        <div className="delete-spot-modal">
            <header>
                <h2>Confirm Delete</h2>
            </header>
            {errors.message && 
            <div className="delete-modal-errors-div">
                <p>{errors.message}</p>
            </div>}
            <div>
                <p>{content}</p>
                <button onClick={handleClick}>{yesButton}</button>
                <button id="no" onClick={() => closeModal()}>{noButton}</button>
            </div>
        </div>
    );

}

export default DeleteSpotModal;