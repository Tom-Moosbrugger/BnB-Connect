import { useNavigate } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { FaBed } from "react-icons/fa";
import ProfileButton from './ProfileButton';
import './Navigation.css';

const Navigation = ({ isLoaded }) => {
    const navigate = useNavigate();
    const sessionUser = useSelector((state) => state.session.user);
    
    return (
        <nav className='nav-bar'>
            <div className='left-nav' onClick={() => navigate('/')}>
              <FaBed className='bed'/>
              <h1 className='site-header'>BnBConnect</h1>
            </div>
            {isLoaded && (
           <div className='right-nav'>
              <ProfileButton user={sessionUser} />
           </div>
          )}
        </nav>
    );
};

export default Navigation;