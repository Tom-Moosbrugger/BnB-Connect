import { FaStar } from "react-icons/fa";
import { GoDotFill } from "react-icons/go";

const SpotReviews = ({ reviews, user, spot: { numReviews, avgStarRating, Owner} }) => {

    let content = reviews.length === 0 ? (
        <section className="review-details">
            <p><FaStar /> New</p>
            {user && user?.id !== Owner?.id && <button>Post Your Review</button>}
            {user && user?.id !== Owner?.id && <h2>Be the first to post a review</h2>}
        </section>  
    ) : (
        <>
            <section>
                <p className="spot-details-numreviews">
                    <FaStar /> 
                    <span> {+avgStarRating.toFixed(1)}</span> 
                    <span id="dot-span"><GoDotFill /></span> 
                    <span> {numReviews > 1 ? `${numReviews} reviews` : `${numReviews} review`}</span>
                </p>
                {user && user?.id !== Owner?.id && <button>Post Your Review</button>}
            </section>
            <section className="all-reviews">
                {reviews.map(review => (
                    <section key={review.id} className="review">
                        <h3>{review.User.firstName}</h3>
                        <h4>{review.dateString}</h4>
                        <p>{review.review}</p>
                        {user && user.id === review.User.id && 
                            <div className="update-delete-reviews">
                                <button>Delete</button>
                                <button>Update</button>
                            </div>
                        }
                    </section>
                ))}
            </section>
        </>
        

        
    );
    
    
    return (
       <>
        {content}
       </>
    )
}

export default SpotReviews;