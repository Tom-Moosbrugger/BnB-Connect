import { useParams, useLocation } from 'react-router-dom';
import { useSelector } from 'react-redux'
import { useEffect } from 'react';
import {  } from 'react-router-dom';

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