import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import * as spotActions from '../../store/spots'
import SpotPreview from '../SpotPreview';
import './HomePage.css';

const HomePage = () => {
    const dispatch = useDispatch();
    const spots = useSelector(spotActions.selectSpotsArray);

    useEffect(() => {
        dispatch(spotActions.loadSpotsThunk());
    }, [dispatch]);

    return (
        <div className='spot-preview-container'>
            {spots.map(spot => (
                <SpotPreview key={spot.id} spot={spot} />
            ))}
        </div>
        
    );
}

export default HomePage;