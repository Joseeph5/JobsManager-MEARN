import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { Dashboard, Error, Landing, Register } from './pages';
import { AllJobs, AddJob, Profile, Stats } from './pages/dashboard-pages';

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path='/' element={<Landing />} />
        <Route path='/register' element={<Register />} />
        <Route path='/dashboard' element={<Dashboard />}>
          <Route index element={<AllJobs />} />
          <Route index path='stats' element={<Stats />} />
          <Route path='all-jobs' element={<AllJobs />} />
          <Route path='add-job' element={<AddJob />} />
          <Route path='profile' element={<Profile />} />
        </Route>
        <Route path='*' element={<Error />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
