import { useNavigate } from 'react-router-dom';
import { FaStar } from "react-icons/fa";
import './SpotPreview.css';

const SpotPreview = ({ spot: { id, name, city, state, avgRating, previewImage, price }, componentSource }) => {
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
            <div className="spot-preview-price">
                <p><em>${price}</em> night</p>
            </div>
        </section>      
    );
};

export default SpotPreview;
