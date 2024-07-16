// src/App.js

import React from 'react';
import './App.css';
import Header from "./components/Header";
import { Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import AdminLogin from "./pages/adminlogin";
import AuthorityLogin from "./pages/authoritylogin";
import AuthoritySignup from "./pages/authoritysignup";
import AdminSignup from "./pages/adminsignup";
import NotFound from "./pages/NotFound";
import LandingPage from './pages/LandingPage';
import Dashboard from './pages/dashboard'; // Import the Dashboard component
import SrcDashboard from './pages/srcdashboard'; // Import the Dashboard component

function App() {
    return (
        <main>
            <LandingPage/>
            <Header/>
            <Routes>
                <Route path="/" element={<LandingPage />} />
                <Route path="/home" element={<Home />} />
                <Route path="/admin_user/login" element={<AdminLogin/>} />
                <Route path="/admin_user/signup" element={<AdminSignup />} />
                <Route path="/authority_user/login" element={<AuthorityLogin />} />
                <Route path="/authority_user/signup" element={<AuthoritySignup/>} />
                <Route path="/profile/:username" element={<Dashboard />} /> {/* Add the profile route */}
                <Route path="/difprofile/:username" element={<SrcDashboard />} /> {/* Add the profile route */}
                <Route path="*" element={<NotFound />} />
            </Routes>
        </main>
    );
}

export default App;
