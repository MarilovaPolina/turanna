import React from 'react';
import { useSelector } from 'react-redux';

import searchIcon from '../../../assets/img/icons/search_gray.png';
import personIcon from '../../../assets/img/icons/person.png';
import settingsGrayIcon from '../../../assets/img/icons/settings_gray.png';

const AdminPanelContentHeader = () => {
    const user = useSelector(state => state.auth.user);

    return (
        <div className="admin_content_header">
            <div className="search_part">
                <div className="search">
                    <img src={searchIcon} alt="Search" />
                    <input type="text" name="search" placeholder="Поиск" />
                </div>
            </div>
            <div className="profile_part">
                <div className="profile_info">
                    <div className="profile_img">
                        <img src={personIcon} alt="Profile" />
                    </div>
                    <div className="profile_name">
                        {user?.name}
                    </div>
                </div>
                <div className="profile_settings">
                    <img src={settingsGrayIcon} alt="Settings" />
                </div>
            </div>
        </div>
    );
};

export default AdminPanelContentHeader;