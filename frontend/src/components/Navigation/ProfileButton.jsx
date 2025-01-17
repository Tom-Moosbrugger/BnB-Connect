import { useState, useEffect, useRef } from 'react';
import { useDispatch } from 'react-redux';
import { NavLink, useNavigate } from 'react-router-dom';
import { BsPersonCircle } from "react-icons/bs";
import { FiMenu } from "react-icons/fi";
import * as sessionActions from '../../store/session';
import OpenModalButton from '../OpenModalButton';
import LoginFormModal from '../LoginFormModal';
import SignupFormModal from '../SignupFormModal';

const ProfileButton = ({ user }) => {
    const dispatch = useDispatch();
    const [showMenu, setShowMenu] = useState(false);
    const ulRef = useRef();
    const navigate = useNavigate();

    const toggleMenu = (e) => {
        e.stopPropagation(); // Keep click from bubbling up to document and triggering closeMenu
        setShowMenu(!showMenu);
    };

    useEffect(() => {
        if (!showMenu) return;

        const closeMenu = (e) => {
            if (ulRef.current && !ulRef.current.contains(e.target)) {
                setShowMenu(false);
            }
        }

        document.addEventListener('click', closeMenu);

        return () => document.removeEventListener('click', closeMenu);
    }, [showMenu]);

    const logout = (e) => {
        e.preventDefault();
        dispatch(sessionActions.logoutThunk());
        navigate('/');
    };

    const closeMenu = () => setShowMenu(false);
    
    const ulClassName = "profile-dropdown" + (showMenu ? "" : " hidden");

    return (
        <>
          <div className='profile-buttons' onClick={toggleMenu}>
            <FiMenu id='menu'/>
            <BsPersonCircle />
          </div>
          <div className={ulClassName} ref={ulRef}>
            {user ? (
              <div className='user-dropdown'>
                <div className='user-details'>
                  <span>{`Hello, ${user.firstName}`}</span>
                  <span>{user.email}</span>
                </div>
                <div className='user-spots'>
                  <NavLink onClick={closeMenu} to='/spots/current'>Manage Spots</NavLink>
                </div>
                <div className='user-logout'>
                  <button className='logout-button' onClick={logout}>Log Out</button>
                </div>
              </div>
            ) : (
              <div className='guest-dropdown'>
                  <OpenModalButton
                    buttonText="Sign Up"
                    modalComponent={<SignupFormModal />}
                    onButtonClick={closeMenu}
                  />
                  <OpenModalButton
                    buttonText="Log In"
                    modalComponent={<LoginFormModal />}
                    onButtonClick={closeMenu}
                  />
              </div>
            )}
          </div>
        </>
      );
}

export default ProfileButton;