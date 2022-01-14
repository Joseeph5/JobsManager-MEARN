import axios from 'axios';
import { useEffect } from 'react';
import { useSelector } from 'react-redux';
import { Link, Navigate, Outlet } from 'react-router-dom';
import Wrapper from '../assets/wrappers/Dashboard';
import { SmallSideBar, BigSideBar, Navbar, NavBar } from '../components';

function Dashboard() {
  const { user } = useSelector((state) => state);
  if (!user) {
    return <Navigate to='/' />;
  }
  return (
    <Wrapper>
      <div className='dashboard'>
        <SmallSideBar />
        <BigSideBar />
        <div>
          <NavBar />
          <div className='dashboard-page'>
            <Outlet />
          </div>
        </div>
      </div>
    </Wrapper>
  );
}

export default Dashboard;
