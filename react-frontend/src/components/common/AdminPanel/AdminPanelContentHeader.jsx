import React from 'react';

import searchIcon from '../../../assets/img/icons/search_gray.png';

import ProfilePopup from './ProfilePopup';

const AdminPanelContentHeader = () => {
    return (
        <>
          
            <div className="admin_content_header">
                <div className="search_part">
                    <div className="search">
                        <img src={searchIcon} alt="Search" />
                        <input type="text" name="search" placeholder="Поиск" />
                    </div>
                </div>
                <div className="profile_part">
                    <ProfilePopup />
                    
                </div>
            </div>
        </>
    );
};

export default AdminPanelContentHeader;