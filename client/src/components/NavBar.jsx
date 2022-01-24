import React, { useState } from 'react';
import Wrapper from '../assets/wrappers/Navbar';
import { FaAlignJustify, FaUserCircle, FaCaretDown } from 'react-icons/fa';
import Logo from './Logo';
import useShared from '../utils/shared';
import { useDispatch, useSelector } from 'react-redux';
import { LOGOUT_USER, TOGGLE_SIDEBAR } from '../store/actions';

function NavBar() {
  const { user } = useSelector((state) => state);
  const dispatch = useDispatch();
  const { removeUserFromLocalStorage } = useShared();
  const [showLogout, setShowLogout] = useState(false);

  const toggleSideBar = () => {
    dispatch({ type: TOGGLE_SIDEBAR });
  };

  const logoutUser = () => {
    dispatch({ type: LOGOUT_USER });
    removeUserFromLocalStorage();
  };

  return (
    <Wrapper>
      <div className='nav-center'>
        <button className='toggle-btn' onClick={toggleSideBar}>
          <FaAlignJustify />
        </button>
        <div>
          <Logo />
          <h3 className='logo-text'>Dashboard</h3>
        </div>
        <div className='btn-container'>
          <button className='btn' onClick={() => setShowLogout(!showLogout)}>
            <FaUserCircle />
            {user.name}
            <FaCaretDown />
          </button>
          <div className={showLogout ? 'dropdown show-dropdown' : 'dropdown'}>
            <button onClick={logoutUser} className='dropdown-btn'>
              logout
            </button>
          </div>
        </div>
      </div>
    </Wrapper>
  );
}

export default NavBar;
