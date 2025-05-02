import React from 'react';
import { Outlet } from 'react-router-dom';

import Header from '../components/common/Header';
import Footer from '../components/common/Footer';
import ApplicationPopup from '../components/common/Popup/ApplicationPopup';

const MainLayout = () => {
/* Popup */
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
      <Header onOpenPopup={openPopup} />
      <main>
        <Outlet context={{ onOpenPopup: openPopup }} />
      </main>
      <Footer onOpenPopup={openPopup} />
      <ApplicationPopup 
        isOpen={isPopupOpen} 
        onClose={closePopup} 
        communicationMethod={communicationMethod} 
      />
    </div>
  );
};

export default MainLayout;