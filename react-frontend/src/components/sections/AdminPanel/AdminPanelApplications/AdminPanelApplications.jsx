import React from 'react';
import { Link } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';


import sortIcon from "../../../../assets/img/icons/sort.png";
import ActionsPopup from '../../../common/ActionsPopup/ActionsPopup';
import { getApplications, deleteApplication } from '../../../../store/applicationsSlice';
import { setSortBy, setSortOrder, sortData, toggleSortOrder  } from '../../../../store/tableSortSlice';

const AdminPanelApplications = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { applications, loading, error } = useSelector((state) => state.applications);
  const [currentOpenId, setCurrentOpenId] = React.useState(null);
  const { sortBy, sortOrder } = useSelector((state) => state.tableSort);

  React.useEffect(() => {
    dispatch(getApplications());
  }, [dispatch]);

  const handleDelete = (applicationId) => {
    if (window.confirm('Вы уверены, что хотите удалить эту заявку?')) {
      dispatch(deleteApplication(applicationId))
        .then(() => alert('Заявка удалена успешно'))
        .catch((error) => alert('Ошибка при удалении заявки: ' + error.message));
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

  const sortedApplications = sortData(applications, sortBy, sortOrder); 
  return (
    <div className="admin_panel_content">
      <div className="content_heading">
        <p className="small_title_text">Заявки</p>
        <Link to="create_application" className="blue_btn">Добавить заявку</Link>
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
                Статус
                <img onClick={() => handleSort('title')} className="col_sort" src={sortIcon} alt="Sort" />
              </th>
              <th className="table_cell">
                Сп. связи
                <img onClick={() => handleSort('title')} className="col_sort" src={sortIcon} alt="Sort" />
              </th>
              <th className="table_cell">
                Имя
                <img onClick={() => handleSort('title')} className="col_sort" src={sortIcon} alt="Sort" />
              </th>
              <th className="table_cell">
                Дата
                <img onClick={() => handleSort('date')} className="col_sort" src={sortIcon} alt="Sort" />
              </th>
              <th className="table_cell">
                Контакты
              </th>
              <th className="table_cell">
                Время связи
                <img onClick={() => handleSort('title')} className="col_sort" src={sortIcon} alt="Sort" />
              </th>
              <th className="table_cell">
                Направл-е
                <img onClick={() => handleSort('title')} className="col_sort" src={sortIcon} alt="Sort" />
              </th>
              <th className="table_cell">
                Файлы
                <img onClick={() => handleSort('date')} className="col_sort" src={sortIcon} alt="Sort" />
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
                <td colSpan="4">Ошибка при загрузке заявок</td>
              </tr>
            ) : (
                sortedApplications.map((application) => (
                    <tr key={application.id}>
                        <td>{application.id}</td>
                        <td>
                            {application.status === "Новая" && <p className='new_application'>Новая</p>}
                            {application.status === "Отклонено" && <p className='rejected_application'>Отклонено</p>}
                            {application.status === "Принято" && <p className='accepted_application'>Принято</p>}
                            {application.status === "Завершено" && <p className='completed_application'>Завершено</p>}
                        </td>
                        <td>{application.communication_method === 'call' ? 'Позвонить' : 'Написать'}</td>
                        <td className='td_width_limit'>{application.name}</td>
                        <td className='date_td'>
                            {new Date(application.created_at).toLocaleString('ru-RU', {
                                day: '2-digit',
                                month: '2-digit',
                                year: 'numeric',
                                hour: '2-digit',
                                minute: '2-digit',
                                hour12: false,
                            })}
                        </td>
                        <td className='td_width_limit'>{application.contacts}</td>
                        <td>{application.communication_time || '—'}</td>
                        <td className='td_width_limit'>{application.direction || '—'}</td>
                        <td>{application.documents ? application.documents?.length : 0}</td>
                        <td>
                        <ActionsPopup
                            id={application.id}
                            currentOpenId={currentOpenId}
                            setCurrentOpenId={setCurrentOpenId}
                            onDelete={handleDelete}
                            onEdit={() => navigate(`edit_application/${application.id}`)}
                        />
                        </td>
                    </tr>
                ))
            )}
          </tbody>
        </table>
      </div>
      <div className="table_footer">Всего {applications.length} результатов</div>
    </div>
  );
}

export default AdminPanelApplications


