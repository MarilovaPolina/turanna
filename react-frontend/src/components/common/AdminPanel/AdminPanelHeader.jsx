import React from 'react';
import logo from '../../../assets/img/logo_with_text.png';

const AdminPanelHeader = ({ sidebarOpen, toggleSidebar }) => {
    return (
        <div className="mobile_header">
            <div className="logo_wrapper">
                <img className="logo_img" src={logo} alt="Logo" />
                <div className="logo_text_wrapper">
                    <p className="logo_text">TURANNA ON-LINE</p>
                    <b><p>Админ-панель</p></b>
                </div>
            </div>
            <div className="burger_menu" onClick={toggleSidebar}>
                <span></span>
                <span></span>
                <span></span>
            </div>
        </div>
    );
};

export default AdminPanelHeader;