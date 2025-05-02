import React from 'react';
import { useDispatch } from 'react-redux';
import { deleteUser } from "../../../store/usersSlice";

const ActionsPopup = ({ userId, currentOpenId, setCurrentOpenId }) => {
  const popupRef = React.useRef(null);
  const dispatch = useDispatch();

  const togglePopup = (e) => {
    e.stopPropagation();
    setCurrentOpenId(currentOpenId === userId ? null : userId);
  };

  const handleClickOutside = (event) => {
    if (popupRef.current && !popupRef.current.contains(event.target)) {
      setCurrentOpenId(null);
    }
  };

  React.useEffect(() => {
    document.addEventListener('click', handleClickOutside);
    return () => {
      document.removeEventListener('click', handleClickOutside);
    };
  }, []);

  const onDelete = (e) => {
    e.stopPropagation();
    
    if (window.confirm('Вы уверены, что хотите удалить этого пользователя?')) {
      dispatch(deleteUser(userId))
        .then(() => setCurrentOpenId(null))
        .catch(error => alert('Ошибка: ' + error.message));
    }
  };


  return (
    <div className="table_actions" onClick={togglePopup}>
      <span>...</span>
      {currentOpenId === userId && (
        <div className="actions_popup" ref={popupRef}>
          <div className="action_item">Редактировать</div>
          <div onClick={onDelete} className="action_item">Удалить</div>
        </div>
      )}
    </div>
  );
};

export default ActionsPopup;