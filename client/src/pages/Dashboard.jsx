import axios from 'axios';
import { useEffect } from 'react';
import { useSelector } from 'react-redux';
import { Link, Navigate, Outlet } from 'react-router-dom';
import Wrapper from '../assets/wrappers/SharedLayout';

function Dashboard() {
  const { user } = useSelector((state) => state);
  if (!user) {
    return <Navigate to='/' />;
  }
  return (
    <Wrapper>
      <nav>
        <Link to='all-jobs'>all jobs</Link>
        <Link to='add-job'>add jobs</Link>
      </nav>
      <Outlet />
    </Wrapper>
  );
}

export default Dashboard;
