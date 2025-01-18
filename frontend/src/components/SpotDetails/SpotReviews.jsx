import { FaStar } from "react-icons/fa";
import { GoDotFill } from "react-icons/go";
import OpenModalButton from '../OpenModalButton';
import CreateSpotReview from "../SpotReviewModal/CreateSpotReview";
import EditSpotReview from "../SpotReviewModal/EditSpotReview";
import DeleteModal from "../DeleteModal";
import './SpotReviews.css';

const SpotReviews = ({ reviews, user, spot: { id: spotId, name, numReviews, avgStarRating, Owner} }) => {
    let hasReview = false;
    let userIsOwner = false;

    if (user) {
        hasReview = reviews.some(review => user.id === review.User.id);
        userIsOwner = user.id === Owner.id
    }

    let content = reviews.length === 0 ? (
        <section className="no-reviews">
            <p className="spot-reviews-numreviews"><FaStar /> New</p>
            {user && !userIsOwner && 
            <OpenModalButton
            buttonText="Post Your Review"
            modalComponent={<CreateSpotReview spotId={spotId}/>}
            />}
            {user && !userIsOwner && <h2>Be the first to post a review!</h2>}
        </section>  
    ) : (
        <>
            <section className='some-reviews'>
                <p className="spot-reviews-numreviews">
                    <FaStar /> 
                    <span> {avgStarRating?.toString().slice(0, 3)}</span> 
                    <span id="dot-span"><GoDotFill /></span> 
                    <span> {+numReviews > 1 ? `${numReviews} reviews` : `${numReviews} review`}</span>
                </p>
                {user && !userIsOwner && !hasReview &&
                <OpenModalButton
                buttonText="Post Your Review"
                modalComponent={<CreateSpotReview spotId={spotId}/>}
                />}
            </section>
            <section className="all-reviews">
                {reviews.map(review => (
                    <section key={review.id} className="review">
                        <h3>{review.User.firstName}</h3>
                        <h4>{review.dateString}</h4>
                        <p>{review.review}</p>
                        {user && user.id === review.User.id && 
                            <div className="update-delete-reviews">
                                 <OpenModalButton
                                buttonText="Delete"
                                modalComponent={<DeleteModal spotId={spotId} reviewId={review.id} formType={'deleteReview'}/>}
                                />
                                 <OpenModalButton
                                buttonText="Update"
                                modalComponent={<EditSpotReview spotId={spotId} spotName={name} review={review}/>}
                                />
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