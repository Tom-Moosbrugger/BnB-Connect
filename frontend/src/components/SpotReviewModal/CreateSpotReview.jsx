import SpotReviewModal from "./SpotReviewModal"

const CreateSpotReview = ({ spotId }) => {
    const review = {
        review: '',
        stars: 0
    }

    return (
        <SpotReviewModal review={review} formType='createReview' spotId={spotId} />
    );
};

export default CreateSpotReview;