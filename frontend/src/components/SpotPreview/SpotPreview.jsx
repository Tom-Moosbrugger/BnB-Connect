import { useNavigate } from 'react-router-dom';
import { FaStar } from "react-icons/fa";
import './SpotPreview.css';

const SpotPreview = ({ spot: { id, name, city, state, avgRating, previewImage, price }}) => {
    const navigate = useNavigate();

    return (
        <section className="spot-preview" title={name} onClick={() => navigate(`/spots/${id}`)}>
            <img className="spot-preview-image" src={previewImage} alt={name} />
            <div className="spot-preview-details">
                <p>{city}, {state}</p>
                <p>
                    <FaStar /> {avgRating ? avgRating.toFixed(1) : 'New'}
                </p>
            </div>
            <p className="spot-preview-price"><em>${price}</em> night</p>
        </section>      
    );
};

export default SpotPreview;
