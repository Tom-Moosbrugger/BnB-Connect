import { useEffect } from "react";
import { useDispatch, useSelector } from 'react-redux';
import SpotPreview from "../SpotPreview";
import * as sessionActions from '../../store/session';


/* 

refactor the spotPreview to only render update/delete functionality if it's in manage spots
    add update and delete
*/

const ManageSpots = () => {
    const dispatch = useDispatch()
    const sessionUser = useSelector(state => state.session.user);

    useEffect(() => {
        dispatch(sessionActions.addUserSpotsThunk())
    }, [dispatch])

    if (!sessionUser || !sessionUser?.spots) return <h2>Loading...</h2>

    return (
        <>
            <header className="manage-spots-header">
                <h2>Manage Spots</h2>
                <button>Create a Spot</button>
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