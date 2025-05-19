import React from 'react';
import { BrowserRouter, Routes, Route, useLocation } from 'react-router-dom';
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
import ProtectedRoute from "./ProtectedRoute";
import AdminPanelUsersContent from './components/sections/AdminPanel/AdminPanelUsers/AdminPanelUsersContent';
import AdminPanelCreateUser from './components/sections/AdminPanel/AdminPanelUsers/AdminPanelCreateUser';
import AdminPanelInfoSheet from './components/sections/AdminPanel/AdminPanelInfoSheet/AdminPanelInfoSheet';
import AdminPanelCreateInfoSheet from './components/sections/AdminPanel/AdminPanelInfoSheet/AdminPanelCreateInfoSheet';
import AdminPanelEditInfoSheet from './components/sections/AdminPanel/AdminPanelInfoSheet/AdminPanelEditInfoSheet';
import AdminPanelArticle from './components/sections/AdminPanel/AdminPanelArticles/AdminPanelArticles';
import AdminPanelCreateArticle from './components/sections/AdminPanel/AdminPanelArticles/AdminPanelCreateArticle';
import AdminPanelEditArticle from './components/sections/AdminPanel/AdminPanelArticles/AdminPanelEditArticle';
import AdminPanelCertificates from './components/sections/AdminPanel/AdminPanelCertificates/AdminPanelCertificates';
import AdminPanelCreateCertificate from './components/sections/AdminPanel/AdminPanelCertificates/AdminPanelCreateCertificate';
import AdminPanelEditCertificate from './components/sections/AdminPanel/AdminPanelCertificates/AdminPanelEditCertificate';
import AdminPanelApplications from './components/sections/AdminPanel/AdminPanelApplications/AdminPanelApplications';
import AdminPanelEditApplication from './components/sections/AdminPanel/AdminPanelApplications/AdminPanelEditApplication';
import AdminPanelCreateTourPackage from './components/sections/AdminPanel/AdminPanelTours/AdminPanelCreateTourPackage';
import AdminPanelEditTourPackage from './components/sections/AdminPanel/AdminPanelTours/AdminPanelEditTourPackage';
import AdminPanelCreatePartner from './components/sections/AdminPanel/AdminPanelPartners/AdminPanelCreatePartner';
import AdminPanelPartners from './components/sections/AdminPanel/AdminPanelPartners/AdminPanelPartners';
import AdminPanelEditPartner from './components/sections/AdminPanel/AdminPanelPartners/AdminPanelEditPartner';
import AllPosts from './pages/AllPosts';

function ScrollToTop() {
    const { pathname, hash } = useLocation();

    React.useEffect(() => {
        if (hash) return;
        window.scrollTo({ top: 0, behavior: 'smooth' });
    }, [pathname]);

    return null;
}

function App() {
 
    return (
        <BrowserRouter>
            <ScrollToTop />
            <Routes>
                <Route path="/" element={<MainLayout />} >
                    <Route index element={<HomePage />} />
                    <Route path="/about_us" element={<AboutUs />} />
                    <Route path="/article_vacation_package/:id" element={<ArticleVacationPackage />} />
                    <Route path="/article/:id" element={<Article />} />
                    <Route path="/info_sheet" element={<InfoSheet />} />
                    <Route path="/posts" element={<AllPosts />} />

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

                    <Route path="tours">
                        <Route index element={<AdminPanelToursContent />} />
                        <Route path="create_tour_package" element={<AdminPanelCreateTourPackage />} />
                        <Route path="edit_tour_package/:id" element={<AdminPanelEditTourPackage />} />
                    </Route>
                    <Route path="users">
                        <Route index element={<AdminPanelUsersContent />} />
                        <Route path="create_user" element={<AdminPanelCreateUser />} />
                    </Route>
                    <Route path="info_sheets">
                        <Route index element={<AdminPanelInfoSheet />} />
                        <Route path="create_info_sheet" element={<AdminPanelCreateInfoSheet />} />
                        <Route path="edit_info_sheet/:id" element={<AdminPanelEditInfoSheet />} />
                    </Route>
                    <Route path="articles">
                        <Route index element={<AdminPanelArticle />} />
                        <Route path="create_article" element={<AdminPanelCreateArticle />} />
                        <Route path="edit_article/:id" element={<AdminPanelEditArticle />} />
                    </Route>
                    <Route path="certificates">
                        <Route index element={<AdminPanelCertificates />} />
                        <Route path="create_certificate" element={<AdminPanelCreateCertificate />} />
                        <Route path="edit_certificate/:id" element={<AdminPanelEditCertificate />} />
                    </Route>
                    <Route path="applications">
                        <Route index element={<AdminPanelApplications />} />
                        <Route path="edit_application/:id" element={<AdminPanelEditApplication />} />
                    </Route>
                    <Route path="partners">
                        <Route index element={<AdminPanelPartners />} />
                        <Route path="create_partner" element={<AdminPanelCreatePartner />} />
                        <Route path="edit_partner/:id" element={<AdminPanelEditPartner />} />
                    </Route>
                </Route>
            </Routes>
        </BrowserRouter>
    );
}

export default App;