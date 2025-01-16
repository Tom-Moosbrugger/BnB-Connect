import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import * as spotActions from '../../store/spots'
import SpotPreview from '../SpotPreview';

const HomePage = () => {
    const dispatch = useDispatch();
    const spots = useSelector(spotActions.selectSpotsArray);

    useEffect(() => {
        dispatch(spotActions.loadSpotsThunk());
    }, [dispatch]);

    return (
        <article className='spot-preview-container'>
            {spots.map(spot => (
                <SpotPreview key={spot.id} spot={spot} componentSource='home' />
            ))}
        </article>
    );
}

export default HomePage;