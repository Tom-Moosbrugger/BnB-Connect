import { FaStar } from "react-icons/fa";
import { GoDotFill } from "react-icons/go";
import './ReserveSpot.css';

const ReserveSpot = ({ spot: { price, avgStarRating, numReviews} }) => {
    const handleClick = () => {
        return window.alert('Feature coming soon!')
    }

    let content = !avgStarRating ? (
        <p><FaStar /> New</p>
    ) : (
        <p className="spot-details-reviews">
            <FaStar /> 
            <span> {avgStarRating}</span> 
            <span id="dot-span"><GoDotFill /></span> 
            <span> {numReviews} reviews</span>
        </p>
    );

    return (
        <>
            <div className='pricing-and-rating'>
                <p className="spot-details-price"><em>${price}</em> night</p>
                {content}
            </div>
            <button className="reserve-button" onClick={handleClick}>Reserve</button>
        </>
        
    )
}

export default ReserveSpot