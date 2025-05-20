import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import {
  getApplicationById,
  updateApplicationStatus,
  uploadApplicationDocument,
  deleteApplicationDocument,
  fetchApplicationDocuments,
  clearSuccess,
} from '../../../../store/applicationsSlice';

import closeIcon from "../../../../assets/img/icons/close.png"

const AdminPanelEditApplication = () => {
  const { id } = useParams();
  const dispatch = useDispatch();
  const {
    currentApplication,
    loading,
    error,
    success,
    documents
  } = useSelector((state) => state.applications);

  const [selectedStatus, setSelectedStatus] = useState('');

  useEffect(() => {
    dispatch(getApplicationById(id)).then((action) => {
      if (action.meta.requestStatus === 'fulfilled') {
        dispatch(fetchApplicationDocuments(id));
      }
    });
  }, [dispatch, id]);

  useEffect(() => {
    if (success) {
      setTimeout(() => dispatch(clearSuccess()), 2000);
    }
  }, [success, dispatch]);

  useEffect(() => {
    if (currentApplication) {
      setSelectedStatus(currentApplication.status || '');
    }
  }, [currentApplication]);

  const handleStatusChange = () => {
    if (selectedStatus && selectedStatus !== currentApplication.status) {
      dispatch(updateApplicationStatus({ id, status: selectedStatus }));
    }
  };

const handleFileChange = (e) => {  
  e.preventDefault();
  const file = e.target.files[0];
  if (file) {
    dispatch(uploadApplicationDocument({ id, file })).then((action) => {
      if (action.meta.requestStatus === 'fulfilled') {
        dispatch(fetchApplicationDocuments(id));
      }
    });
  }
};



const confirmDeleteDocument = (docName) => window.confirm(`Вы точно хотите удалить документ с именем ${docName}?`);

const handleDeleteDocumentWithConfirm = (doc) => {
  if (confirmDeleteDocument(doc.original_name || 'Документ')) {
    dispatch(deleteApplicationDocument(doc.id)).then((action) => {
      if (action.meta.requestStatus === 'fulfilled') {
        dispatch(fetchApplicationDocuments(id));
      }
    });
  }
};
  if (loading || !currentApplication) return <div>Загрузка...</div>;
  if (error) return <div style={{ color: 'red' }}>{error}</div>;

  return (
    <div className="admin_panel_content">
      <div className="creation_heading">
        <p className="small_title_text">Заявка №{id}</p>
        <p className="creation_heading_subtitle">
          Здесь вы можете изменить статус заявки и прикрепить к ней документы, которые могут понадобиться (документы, чеки, договоры).
        </p>
      </div>

      <div className="form_container">
        <table className="application_data">
          <tbody>
            <tr><td>Имя:</td><td className='client_info'>{currentApplication.name || "–"}</td></tr>
            <tr><td>Метод связи:</td><td className='client_info'>
              {currentApplication.communication_method === "chat" ? "Написать" : currentApplication.communication_method === "call" ? "Позвонить" : "–"}
            </td></tr>
            <tr><td>Контакты:</td><td className='client_info'>{currentApplication.contacts || "–"}</td></tr>
            <tr><td>Удобное время связи:</td><td className='client_info'>{currentApplication.communication_time || "–"}</td></tr>
            <tr><td>Направление:</td><td className='client_info'>{currentApplication.direction || "–"}</td></tr>
            <tr><td>Бюджет:</td><td className='client_info'>{currentApplication.budget || "–"}</td></tr>
            <tr><td>Примечания:</td><td className='client_info'>{currentApplication.notes || "–"}</td></tr>
          </tbody>
        </table>

        <div className='applicaton_status'>
          <label>Статус: </label>
          <select
            value={selectedStatus}
            onChange={(e) => setSelectedStatus(e.target.value)}
          >
            <option value="">Выберите статус</option>
            <option value="Новая">Новая</option>
            <option value="Принято">Принято</option>
            <option value="Отклонено">Отклонено</option>
            <option value="Завершено">Завершено</option>
          </select>
        </div>

       <div className='application_file_upload'>
        <h3>Загрузить документ</h3>
        <input type="file" onChange={handleFileChange} />
      </div>

        {documents && documents.length > 0 && (
  <div>
    <table className="application_documents_table">
      <thead>
        <tr>
          <th>#</th>
          <th>Название</th>
        </tr>
      </thead>
      <tbody>
        {documents.map((doc, index) => (
          <tr key={doc.id}>
            <td>{index + 1}</td>
            <td className='file_td'>
              <a
                href={`http://localhost:8000/storage/${doc.file_path}`}
                target="_blank"
                rel="noreferrer"
              >
                {doc.original_name || 'Документ'}
              </a>
             <span onClick={() => handleDeleteDocumentWithConfirm(doc)}>
          <img src={closeIcon} />
        </span>
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  </div>
)}


        <button type="button" className="blue_btn" disabled={loading} onClick={handleStatusChange}>
          {loading ? 'Сохранение...' : 'Сохранить'}
        </button>

        {success && <p style={{ color: 'green' }}>Успешно сохранено</p>}
      </div>
    </div>
  );
};

export default AdminPanelEditApplication;
