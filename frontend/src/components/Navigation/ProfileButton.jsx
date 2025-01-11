import { useState, useEffect, useRef } from 'react';
import { useDispatch } from 'react-redux';
import { BsPersonCircle } from "react-icons/bs";
import * as sessionActions from '../../store/session';
import OpenModalButton from '../OpenModalButton';
import LoginFormModal from '../LoginFormModal';
import SignupFormModal from '../SignupFormModal';

const ProfileButton = ({ user }) => {
    const dispatch = useDispatch();
    const [showMenu, setShowMenu] = useState(false);
    const ulRef = useRef();

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
    };

    const closeMenu = () => setShowMenu(false);
    
    const ulClassName = "profile-dropdown" + (showMenu ? "" : " hidden");

    return (
        <>
          <button className='profile-button' onClick={toggleMenu}>
            <BsPersonCircle />
          </button>
          <ul className={ulClassName} ref={ulRef}>
            {user ? (
              <>
                <li>{user.username}</li>
                <li>{user.firstName} {user.lastName}</li>
                <li>{user.email}</li>
                <li>
                  <button onClick={logout}>Log Out</button>
                </li>
              </>
            ) : (
              <>
                <li>
                  <OpenModalButton
                    buttonText="Log In"
                    modalComponent={<LoginFormModal />}
                    onButtonClick={closeMenu}
                  />
                </li>
                <li>
                  <OpenModalButton
                    buttonText="Sign Up"
                    modalComponent={<SignupFormModal />}
                    onButtonClick={closeMenu}
                  />
                </li>
              </>
            )}
          </ul>
        </>
      );
}

export default ProfileButton;