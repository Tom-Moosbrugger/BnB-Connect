import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';
import SpotImagesSection from './SpotImagesSection';
import ReserveSpot from './ReserveSpot';
import SpotReviews from './SpotReviews';
import * as spotActions from '../../store/spots';
import './SpotDetails.css';

const SpotDetails = () => {
    const { spotId } = useParams();
    const dispatch = useDispatch();
    const spot = useSelector(state => state.spots[spotId]);   
    const reviews = useSelector(state => state.spots[spotId].reviews || []);
    const sessionUser = useSelector((state) => state.session.user);

    useEffect(() => {
        dispatch(spotActions.getSpotDetailsThunk(spotId))
    }, [dispatch, spotId]);

    useEffect(() => {
        dispatch(spotActions.getSpotReviewsThunk(spotId));
    }, [dispatch, spotId])

    if (!spot) {
        return <h2>Loading...</h2>;
    }

    return (
        <>
            <article className='spot-details'>
                <header className='spot-details-header'>
                    <h2>{spot.name}</h2>
                    <h3>{spot.city}, {spot.state}, {spot.country}</h3>
                </header>
                <section className='spot-details-images'>
                    <SpotImagesSection spotImages={spot?.SpotImages}/>
                </section>
                <section className='spot-details-information'>
                    <div className='spot-details-description'>
                        <h2>Hosted by {spot.Owner?.firstName} {spot.Owner?.lastName}</h2>
                        <p>{spot.description}</p>
                    </div>
                    <div className='spot-details-reserve'>
                        <ReserveSpot spot={spot} />
                    </div>
                </section>
            </article>
            <aside className='spot-reviews'>
                <SpotReviews reviews={reviews} user={sessionUser} spot={spot}/>
            </aside>
        </>
    );
};

export default SpotDetails;
