import { BrowserRouter, Route, Routes } from 'react-router-dom';
import React from 'react';
import Sidebar from './Sidebar.js';
import Admin from './Admin.js';
import Home from './Home.js';
import Tagger from './Tagger.js';
import Reviewer from './Reviewer.js';
import Manager from './Manager.js';
// import ProtectedRoute from './ProtectedRoute';
import RequireAuth from './RequiredAuth.js';
import { AuthProvider } from '../context/AuthProvider.js';
// import Logout from './Logout.js';
import CreateTask from './CreateTask.js';
import CreateProfile from './CreateProfile.js';

const Dashboard = () => {
  return (
    <BrowserRouter>
      <AuthProvider>
      <Sidebar>
        <Routes>
          <Route path="/" element={<Home />} />
          {/* <Route path="/logout" element={<Logout />} /> */}

          <Route element={<RequireAuth />} >
            <Route path="/admin" element={<Admin />} />
            <Route path="/tagger" element={<Tagger />} />
            <Route path="/reviewer" element={<Reviewer />} />
            <Route path="/manager" element={<Manager />} />
            <Route path="/createtask" element={<CreateTask />} />
            <Route path="/createprofile" element={<CreateProfile />} />
            {/* <Route path="/reports" element={<Reports />} /> */}
             

          </Route>
        </Routes>
      </Sidebar>
        </AuthProvider>
    </BrowserRouter>
  );
};

export default Dashboard