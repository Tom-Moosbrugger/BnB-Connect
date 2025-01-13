import { useNavigate } from 'react-router-dom';
import { FaStar } from "react-icons/fa";
import './SpotPreview.css';

const SpotPreview = ({ spot: { id, name, city, state, avgRating, previewImage, price }}) => {
    const navigate = useNavigate();

    return (
        <section className="spot-preview" title={name} onClick={() => navigate(`/spots/${id}`)}>
            <img className="spot-image" src={previewImage} alt={name} />
            <div className="spot-details">
                <p>{city}, {state}</p>
                <p>
                    <FaStar /> {avgRating}
                </p>
            </div>
            <p className="spot-price"><em>${price}</em> per night</p>
        </section>      
    );
};

export default SpotPreview;
