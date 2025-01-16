import { useModalContext } from "../../context/Modal";
import { useDispatch } from 'react-redux';
import * as spotActions from '../../store/spots';
import * as sessionActions from '../../store/session'
import './DeleteSpotModal.css';

const DeleteSpotModal = ({ spotId }) => {
    const dispatch = useDispatch();
    const { closeModal } = useModalContext();

    const handleClick = async (e) => {
        e.stopPropagation();

        await dispatch(spotActions.deleteSpotThunk(spotId));

        dispatch(sessionActions.deleteUserSpot(spotId));

        closeModal();
    }

    return (
        <div className="delete-spot-modal">
            <header>
                <h2>Confirm Delete</h2>
            </header>
            <div>
                <p>Are you sure you want to remove this spot from this listings?</p>
                <button onClick={handleClick}>{'Yes (Delete Spot)'}</button>
                <button id="no" onClick={() => closeModal()}>{'No (Keep Spot)'}</button>
            </div>

        </div>
    );

}

export default DeleteSpotModal;