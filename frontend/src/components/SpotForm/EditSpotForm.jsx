import { useParams } from 'react-router-dom';
import { useSelector } from 'react-redux'

import SpotForm  from './SpotForm';

const EditSpotForm = () => {
    const { spotId } = useParams();
    const spot = useSelector(state => state.spots[spotId]);

    if (!spot) return <h2>Loading...</h2>;

    return (
        <SpotForm formData={spot} formType='editSpot'/>
    )
}

export default EditSpotForm;