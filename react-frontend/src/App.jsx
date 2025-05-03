import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
//import MouseFollowerCursor from './components/MouseFollowerCursor';

import MainLayout from './layouts/MainLayout';

import Auth from './components/Auth';
import Dashboard from './components/Dashboard';

import HomePage from './pages/HomePage';
import AboutUs from './pages/AboutUs';
import ArticleVacationPackage from './pages/ArticleVacationPackage';
import Article from './pages/Article';
import InfoSheet from './pages/InfoSheet';
import AdminPanelLayout from './layouts/AdminPanelLayout';
import AdminPanelToursContent from './components/sections/AdminPanel/AdminPanelTours/AdminPanelToursContent';
import ProtectedRoute from "./PtotectedRoute";
import AdminPanelUsersContent from './components/sections/AdminPanel/AdminPanelUsers/AdminPanelUsersContent';
import AdminPanelCreateUser from './components/sections/AdminPanel/AdminPanelUsers/AdminPanelCreateUser';
import AdminPanelInfoSheet from './components/sections/AdminPanel/AdminPanelInfoSheet/AdminPanelInfoSheet';
import AdminPanelCreateInfoSheet from './components/sections/AdminPanel/AdminPanelInfoSheet/AdminPanelCreateInfoSheet';

function App() {
    return (
        <BrowserRouter>
            
            <Routes>
                <Route path="/" element={<MainLayout />} >
                    <Route index element={<HomePage />} />
                    <Route path="/about_us" element={<AboutUs />} />
                    <Route path="/article_vacation_package" element={<ArticleVacationPackage />} />
                    <Route path="/article" element={<Article />} />
                    <Route path="/info_sheet" element={<InfoSheet />} />

                    <Route path="/login" element={<Auth isLogin={true} />} />
                    <Route path="/register" element={<Auth isLogin={false} />} />
                    <Route path="/dashboard" element={<Dashboard />} /> 
                </Route>

                <Route path="/dashboard"  
                    element={
                        <ProtectedRoute>
                        <AdminPanelLayout />
                        </ProtectedRoute>
                    } 
                >
                    <Route path="tours" element={<AdminPanelToursContent />} />
                    <Route path="users">
                        <Route index element={<AdminPanelUsersContent />} />
                        <Route path="create_user" element={<AdminPanelCreateUser />} />
                    </Route>
                    <Route path="info_sheets">
                        <Route index element={<AdminPanelInfoSheet />} />
                        <Route path="create_info_sheet" element={<AdminPanelCreateInfoSheet />} />
                    </Route>
                </Route>
            </Routes>
        </BrowserRouter>
    );
}

export default App;