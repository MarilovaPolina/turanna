import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import {
  getApplicationById,
  updateApplicationStatus,
  uploadApplicationDocument,
  clearSuccess,
} from '../../../../store/applicationsSlice';

const AdminPanelEditApplication = () => {
  const { id } = useParams();
  const dispatch = useDispatch();
  const {
    currentApplication,
    loading,
    error,
    success,
  } = useSelector((state) => state.applications);

  const [selectedStatus, setSelectedStatus] = useState('');
  const [documentFile, setDocumentFile] = useState(null);

  useEffect(() => {
    dispatch(getApplicationById(id));
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
    setDocumentFile(e.target.files[0]);
  };

  const handleUpload = () => {
    if (documentFile) {
      dispatch(uploadApplicationDocument({ id, file: documentFile }));
      setDocumentFile(null);
    }
  };

  if (loading || !currentApplication) return <div>Загрузка...</div>;
  if (error) return <div style={{ color: 'red' }}>{error}</div>;

  return (
    <div>
      <h2>Заявка №{id}</h2>
      <p><strong>Имя:</strong> {currentApplication.name}</p>
      <p><strong>Метод связи:</strong> {currentApplication.communication_method}</p>
      <p><strong>Контакты:</strong> {currentApplication.contacts}</p>
      <p><strong>Удобное время связи:</strong> {currentApplication.communication_time}</p>
      <p><strong>Направление:</strong> {currentApplication.direction}</p>
      <p><strong>Бюджет:</strong> {currentApplication.budget}</p>
      <p><strong>Примечания:</strong> {currentApplication.notes}</p>

      <div>
        <label>Статус: </label>
        <select
          value={selectedStatus}
          onChange={(e) => setSelectedStatus(e.target.value)}
        >
          <option value="">Выберите статус</option>
          <option value="новая">Новая</option>
          <option value="в работе">В работе</option>
          <option value="завершена">Завершена</option>
        </select>
        <button onClick={handleStatusChange}>Сохранить</button>
      </div>

      <div>
        <h3>Загрузить документ</h3>
        <input type="file" onChange={handleFileChange} />
        <button onClick={handleUpload}>Загрузить</button>
      </div>

      {currentApplication.documents && currentApplication.documents.length > 0 && (
        <div>
          <h3>Загруженные документы</h3>
          <ul>
            {/*currentApplication.documents.map((doc, index) => (
              <li key={index}>
                <a href={doc.url} target="_blank" rel="noopener noreferrer">{doc.original_name}</a>
              </li>
            ))*/}
          </ul>
        </div>
      )}

      {success && <p style={{ color: 'green' }}>Успешно сохранено</p>}
    </div>
  );
};

export default AdminPanelEditApplication;
