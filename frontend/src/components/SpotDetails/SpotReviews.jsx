import { FaStar } from "react-icons/fa";
import { GoDotFill } from "react-icons/go";

const SpotReviews = ({ reviews, user, spot: { numReviews, avgStarRating} }) => {
    console.log(reviews);
    console.log(user);
    
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
        {content}
       </>
    )
}

export default SpotReviews;