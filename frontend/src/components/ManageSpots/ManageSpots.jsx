import { useEffect } from "react";
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import SpotPreview from "../SpotPreview";
import * as sessionActions from '../../store/session';
import './ManageSpots.css';

/* 
    add update and delete
*/

const ManageSpots = () => {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const sessionUser = useSelector(state => state.session.user);

    useEffect(() => {
        dispatch(sessionActions.addUserSpotsThunk())
    }, [dispatch])

    if (!sessionUser || !sessionUser?.spots) return <h2>Loading...</h2>

    return (
        <>
            <header className="manage-spots-header">
                <h2>Manage Your Spots</h2>
                <button onClick={() => navigate('/spots/new')}>Create a New Spot</button>
            </header>
            <article className='spot-preview-container'>
                {sessionUser.spots.map(spot => (
                    <SpotPreview key={spot.id} spot={spot} componentSource='manageSpots' />
                ))}
            </article>
        </>
    )
};

export default ManageSpots;