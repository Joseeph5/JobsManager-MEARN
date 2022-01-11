import axios from 'axios';
import { useEffect } from 'react';
import { useSelector } from 'react-redux';

function Dashboard() {
  const { user } = useSelector((state) => state);

  console.log(user);
  return <div>Dashboard</div>;
}

export default Dashboard;
