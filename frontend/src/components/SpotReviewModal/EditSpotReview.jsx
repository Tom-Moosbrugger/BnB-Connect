import SpotReviewModal from "./SpotReviewModal"

const EditSpotReview = ({ review, spotId, spotName }) => {
    return (
        <SpotReviewModal review={review} formType='editReview' spotId={spotId} spotName={spotName}/>
    );
};

export default EditSpotReview;