import React from 'react';

import { useDispatch, useSelector } from 'react-redux';

import personIcon from '../../../assets/img/icons/person.png';
import settingsGrayIcon from '../../../assets/img/icons/settings_gray.png';

import { logoutUser } from '../../../store/authSlice';

const ProfilePopup = ({ onLogout }) => {
    const user = useSelector(state => state.auth.user);
    const dispatch = useDispatch();

  const popupRef = React.useRef(null);
    const [isOpen, setIsOpen] = React.useState(false);

  const togglePopup = (e) => {
    e.stopPropagation();
     setIsOpen(!isOpen);
  };

  const handleClickOutside = (event) => {
    if (popupRef.current && !popupRef.current.contains(event.target)) {
      setIsOpen(false);
    }
  };

  React.useEffect(() => {
    document.addEventListener('click', handleClickOutside);
    return () => {
      document.removeEventListener('click', handleClickOutside);
    };
  }, []);

const handleLogout = async (e) => {
    e.stopPropagation();
    const confirmed = window.confirm('Вы уверены, что хотите выйти из аккаунта?');
    if (confirmed) {
        try {
            await dispatch(logoutUser()).unwrap();
            window.location.href = "/login";
        } catch (error) {
            alert("Ошибка при выходе: " + error);
        }
    }
};

  return (
    <div className="table_actions" onClick={togglePopup}>
      <div className="profile_info">
        <div className="profile_img">
          <img src={personIcon} />
        </div>
        <div className="profile_name">
          {user?.name}
        </div>
      </div>
      <div className="profile_settings">
        <img src={settingsGrayIcon} />
      </div>

      {isOpen && (
        <div className="actions_popup" ref={popupRef}>
          <div onClick={handleLogout} className="action_item">Выйти</div>
        </div>
      )}
    </div>
  );
};

export default ProfilePopup;
