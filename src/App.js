import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'

import Login from './pages/authpages/login';
import Signup from './pages/authpages/signup';

import Dashboardpage from './pages/mainpages/dashboardpage';


import Dnspage from './pages/mainpages/dnspage';

import Errorpage from './pages/subordinatepages/errorpage';
import Landingpage from './pages/subordinatepages/landingpage';
import Notificationpage from './pages/mainpages/notificationpage';
import DomainRecordsPage from './pages/mainpages/viewpage';


function App() {
  return (
    <Router>
      <Routes>

        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<Signup />} />

        <Route path='/dashboard' element={<Dashboardpage />} />
        <Route path='/notification' element={<Notificationpage />} />
        <Route path='/dns' element={<Dnspage />} />

        <Route path="/view/:id" element={<DomainRecordsPage />} />

        <Route path='/' element={<Landingpage />} />
        <Route path='*' element={<Errorpage />} />

      </Routes>
    </Router>
  );
}

export default App;