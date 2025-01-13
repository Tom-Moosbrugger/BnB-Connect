import { FaStar } from "react-icons/fa";
import './SpotPreview.css';

const SpotPreview = ({ spot: { name, city, state, avgRating, previewImage, price } }) => {
    return (
        <section className="spot-preview" title={name}>
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
