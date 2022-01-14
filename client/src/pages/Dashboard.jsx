import axios from 'axios';
import { useEffect } from 'react';
import { useSelector } from 'react-redux';
import { Navigate } from 'react-router-dom';

function Dashboard() {
  const { user } = useSelector((state) => state);
  if (!user) {
    return <Navigate to='/' />;
  }
  return (
    <div>
      <h2>Dashboard is under development...</h2>
    </div>
  );
}

export default Dashboard;
