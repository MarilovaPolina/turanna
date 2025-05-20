import React from 'react';
import { Outlet } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';

import Footer from '../components/common/Footer';
import ApplicationPopup from '../components/common/Popup/ApplicationPopup';
import AdminPanelHeader from '../components/common/AdminPanel/AdminPanelHeader';
import AdminPanelSidebar from '../components/common/AdminPanel/AdminPanelSidebar';
import AdminPanelContentHeader from  '../components/common/AdminPanel/AdminPanelContentHeader';

import { getUser } from '../store/authSlice';
import { getApplications } from '../store/applicationsSlice';

const AdminPanelLayout = () => {
  const dispatch = useDispatch();
  const token = useSelector(state => state.auth.token);

  React.useEffect(() =>  {
    if(token) {
      dispatch(getUser());
    }
  }, [token]);

  React.useEffect(() => {
    dispatch(getApplications());
  }, [dispatch]);

  const [isMobile, setIsMobile] = React.useState(window.innerWidth <= 1300);
  const [sidebarOpen, setSidebarOpen] = React.useState(false);

  React.useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth <= 1300);
      if (window.innerWidth > 1300) {
        setSidebarOpen(false);
      }
    };

    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  const toggleSidebar = () => {
    setSidebarOpen(!sidebarOpen);
  };

  const closeSidebar = () => {
    setSidebarOpen(false);
  };

  const [isPopupOpen, setIsPopupOpen] = React.useState(false);
  const [communicationMethod, setCommunicationMethod] = React.useState('call');
  const openPopup = (method) => {
    setCommunicationMethod(method);
    setIsPopupOpen(true);
    document.body.style.overflow = 'hidden';
  };
  const closePopup = () => {
    setIsPopupOpen(false);
    document.body.style.overflow = 'auto';
  };
  React.useEffect(() => {
    return () => {
      document.body.style.overflow = 'auto';
    };
  }, []);


  return (
    <div className="wrapper">
      {isMobile && (
        <>
          <AdminPanelHeader sidebarOpen={sidebarOpen} toggleSidebar={toggleSidebar} />
          <div
            className={`burger_menu_overlay ${sidebarOpen ? 'active' : ''}`}
            onClick={closeSidebar}
          />
        </>
      )}

      <div className="admin_panel_wrapper">
        <AdminPanelSidebar isMobile={isMobile} sidebarOpen={sidebarOpen} />

        <div className={`admin_panel_content_block ${isMobile ? '' : 'with-sidebar'}`}>
            <div className="admin_panel_content_block with-sidebar">
              <AdminPanelContentHeader />
              <Outlet />
            </div>
        </div>
      </div>

      <Footer onOpenPopup={openPopup} />
      <ApplicationPopup
        isOpen={isPopupOpen}
        onClose={closePopup}
        communicationMethod={communicationMethod}
      />
    </div>
  );
};

export default AdminPanelLayout;
