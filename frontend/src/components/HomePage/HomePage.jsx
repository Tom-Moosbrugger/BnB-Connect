import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import * as spotActions from '../../store/spots'
import SpotPreview from '../SpotPreview';
import './HomePage.css';

const HomePage = () => {
    const dispatch = useDispatch();
    const spots = useSelector(state => Object.values(state.spots));

    useEffect(() => {
        dispatch(spotActions.loadSpotsThunk());
    }, [dispatch]);

    return (
        <div className='spot-preview-container'>
            {spots.map(spot => (
                <SpotPreview key={spot.id} spot={{ 
                    name: spot.name,
                    city: spot.city, 
                    state: spot.state,
                    avgRating: spot.avgRating,
                    previewImage: spot.previewImage,
                    price: spot.price
                }} />))}
        </div>
        
    );
}

export default HomePage;