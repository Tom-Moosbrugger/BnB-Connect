import { useNavigate } from 'react-router-dom';
import { FaStar } from "react-icons/fa";
import OpenModalButton from '../OpenModalButton';
import DeleteModal from '../DeleteModal';
import './SpotPreview.css';

const SpotPreview = ({ spot: { id, name, city, state, avgRating, previewImage, price }, componentSource }) => {
    const navigate = useNavigate();

    const handleNavigate = (e) => {
        e.stopPropagation();
        navigate(`/spots/${id}/edit`);
    } 

    return (
        <section 
        className={componentSource === 'home' ? `spot-preview home` : `spot-preview`} 
        title={name} 
        onClick={() => navigate(`/spots/${id}`)}
        >
            <img className="spot-preview-image" src={previewImage} alt={name} />
            <div className="spot-preview-details">
                <p>{city}, {state}</p>
                <p>
                    <FaStar /> {avgRating ? avgRating.toString().slice(0, 3) : 'New'}
                </p>
            </div>
            <div className="spot-preview-price">
                <p><em>${price}</em> night</p>
            </div>
            {componentSource === 'manageSpots' && 
            <div className='spot-preview-update-delete'>
                <button onClick={handleNavigate}>Update</button>
                <OpenModalButton
                 buttonText="Delete"
                 modalComponent={<DeleteModal spotId={id} formType='deleteSpot'/>}
                />
            </div>}
        </section>      
    );
};

export default SpotPreview;
