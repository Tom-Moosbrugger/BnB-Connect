import SpotReviewModal from "./SpotReviewModal"

const EditSpotReview = ({ review }) => {

    return (
        <SpotReviewModal review={review} formType='editReview' />
    );
};

export default EditSpotReview;