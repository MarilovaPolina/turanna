import React from 'react';
import { Link } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';


import sortIcon from "../../../../assets/img/icons/sort.png";
import ActionsPopup from '../../../common/ActionsPopup/ActionsPopup';
import { getCertificates, deleteCertificate } from '../../../../store/certificatesSlice';
import { setSortBy, setSortOrder, sortData, toggleSortOrder  } from '../../../../store/tableSortSlice';

const AdminPanelCertificates = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { certificates, loading, error } = useSelector((state) => state.certificates);
  const [currentOpenId, setCurrentOpenId] = React.useState(null);
  const { sortBy, sortOrder } = useSelector((state) => state.tableSort);

  React.useEffect(() => {
    dispatch(getCertificates());
  }, [dispatch]);

  const handleDelete = (certificateId) => {
    if (window.confirm('Вы уверены, что хотите удалить этот сертификат?')) {
      dispatch(deleteCertificate(certificateId))
        .then(() => alert('Сертификат удален успешно'))
        .catch((error) => alert('Ошибка при удалении сертификата: ' + error.message));
    }
  };

  const handleSort = (column) => {
    if (sortBy === column) {
      dispatch(toggleSortOrder()); 
    } else {
      dispatch(setSortBy(column)); 
      dispatch(setSortOrder('asc'));
    }
  };
  const sortedCertificates = sortData(certificates, sortBy, sortOrder); 
  
  return (
    <div className="admin_panel_content">
      <div className="content_heading">
        <p className="small_title_text">Сертификаты</p>
        <Link to="create_certificate" className="blue_btn">Добавить сертификат</Link>
      </div>

      <div className="table_container">
        <table className="data_table">
          <thead>
            <tr className="table_row">
            <th className="table_cell">
                ID
                <img onClick={() => handleSort('id')} className="col_sort" src={sortIcon} alt="Sort" />
              </th>
              <th className="table_cell">
                Название
                <img onClick={() => handleSort('title')} className="col_sort" src={sortIcon} alt="Sort" />
              </th>
              <th className="table_cell">
                Изображение
              </th>
              <th className="table_cell">
                Дата создания
                <img onClick={() => handleSort('created_at')} className="col_sort" src={sortIcon} alt="Sort" />
              </th>
              <th className="table_cell"></th>
            </tr>
          </thead>
          <tbody>
            {loading ? (
              <tr>
                <td colSpan="4">Загрузка...</td>
              </tr>
            ) : error ? (
              <tr>
                <td colSpan="4">Ошибка при загрузке сертификатов</td>
              </tr>
            ) : (
                sortedCertificates.map((certificate) => (
                <tr key={certificate.id}>
                  <td>{certificate.id}</td>
                  <td className='title_td'>{certificate.title}</td>
                  <td>
                    {certificate.thumbnail_image ? (
                      <img
                        src={`http://localhost:8000${certificate.thumbnail_image}`}
                        className="table_image"
                      />
                    ) : (
                      'Нет изображения'
                    )}
                  </td>
                  <td>
                    {new Date(certificate.created_at).toLocaleString('ru-RU', {
                      day: '2-digit',
                      month: '2-digit',
                      year: 'numeric',
                      hour: '2-digit',
                      minute: '2-digit',
                      hour12: false,
                    })}
                  </td>
                  <td>
                    <ActionsPopup
                        id={certificate.id}
                        currentOpenId={currentOpenId}
                        setCurrentOpenId={setCurrentOpenId}
                        onDelete={handleDelete}
                        onEdit={() => navigate(`edit_certificate/${certificate.id}`)}
                    />
                    </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>
      <div className="table_footer">Всего {certificates.length} результатов</div>
    </div>
  );
}

export default AdminPanelCertificates


