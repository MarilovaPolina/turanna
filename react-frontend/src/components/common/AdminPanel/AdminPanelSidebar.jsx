import React from 'react';
import { NavLink, Link } from 'react-router-dom';
import { useSelector } from 'react-redux';

import logo from '../../../assets/img/logo.png';
import folderIcon from '../../../assets/img/icons/folder.png';
import ticketIcon from '../../../assets/img/icons/ticket.png';
import penIcon from '../../../assets/img/icons/pen.png';
import peopleIcon from '../../../assets/img/icons/people.png';
import documentIcon from '../../../assets/img/icons/document.png';
import diplomatIcon from '../../../assets/img/icons/diplomat.png';
import certificateIcon from '../../../assets/img/icons/certificate.png';
import settingsIcon from '../../../assets/img/icons/settings.png';

const AdminPanelSidebar = ({ isMobile, sidebarOpen }) => {
    const applications = useSelector((state) => state.applications.applications);
    const newApplicationsCount = applications.filter(app => app.status === 'Новая').length;

    const menuItems = [
        { to: "applications", icon: folderIcon, text: "Заявки", count: newApplicationsCount },
        { to: "tours", icon: ticketIcon, text: "Туры" },
        { to: "articles", icon: penIcon, text: "Статьи" },
        { to: "users", icon: peopleIcon, text: "Пользователи" },
        { to: "info_sheets", icon: documentIcon, text: "Справка" },
        { to: "partners", icon: diplomatIcon, text: "Партнеры" },
        { to: "certificates", icon: certificateIcon, text: "Сертификаты" },
        { to: "settings", icon: settingsIcon, text: "Настройки" },
    ];

    return (
        <aside>
            <div className={`admin_sidebar ${isMobile ? (sidebarOpen ? 'visible' : 'hidden') : ''}`}>
                <div className="logo_wrapper">
                    <Link to="/">
                        <img className="logo_img" src={logo} alt="Logo" />
                    </Link>
                    <div className="logo_text_wrapper">
                        <p className="logo_text">TURANNA ON-LINE</p>
                        <b><p>Админ-панель</p></b>
                    </div>
                </div>
                <div className="admin_sidebar_content">
                    <p>НАСТРОЙКИ</p>
                    <ul className="settings_list">
                        {menuItems.map((item) => (
                            <li key={item.to} className="settings_list_item">
                                <NavLink 
                                    className="nav_link" 
                                    activeClassName="active" 
                                    to={item.to}
                                >
                                    <img src={item.icon} alt={item.text} />
                                    {item.text}
                                    {item.count > 0 && (
                                        <span className="new_applications_badge">{item.count}</span>
                                    )}
                                </NavLink>
                            </li>
                        ))}
                    </ul>
                </div>
            </div>
        </aside>
    );
};

export default AdminPanelSidebar;