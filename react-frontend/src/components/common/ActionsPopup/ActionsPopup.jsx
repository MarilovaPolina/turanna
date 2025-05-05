import React from 'react';

const ActionsPopup = ({ id, currentOpenId, setCurrentOpenId, onDelete, onEdit }) => {
  const popupRef = React.useRef(null);

  const togglePopup = (e) => {
    e.stopPropagation();
    setCurrentOpenId(currentOpenId === id ? null : id);
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

  const handleDelete = (e) => {
    e.stopPropagation();
    if (onDelete) onDelete(id);
  };

  const handleEdit = (e) => {
    e.stopPropagation();
    if (onEdit) onEdit(id);
  };

  return (
    <div className="table_actions" onClick={togglePopup}>
      <span>...</span>
      {currentOpenId === id && (
        <div className="actions_popup" ref={popupRef}>
          <div onClick={handleEdit} className="action_item">Редактировать</div>
          <div onClick={handleDelete} className="action_item">Удалить</div>
        </div>
      )}
    </div>
  );
};

export default ActionsPopup;
