import React from 'react';
import { Link } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';


import sortIcon from "../../../../assets/img/icons/sort.png";
import ActionsPopup from '../../../common/ActionsPopup/ActionsPopup';
import { getPartners, deletePartner } from '../../../../store/partnersSlice';
import { setSortBy, setSortOrder, sortData, toggleSortOrder  } from '../../../../store/tableSortSlice';

const AdminPanelPartners = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { partners, loading, error } = useSelector((state) => state.partners);
  const [currentOpenId, setCurrentOpenId] = React.useState(null);
  const { sortBy, sortOrder } = useSelector((state) => state.tableSort);

  React.useEffect(() => {
    dispatch(getPartners());
  }, [dispatch]);

  const handleDelete = (partnerId) => {
    if (window.confirm('Вы уверены, что хотите удалить этого партнера?')) {
      dispatch(deletePartner(partnerId))
        .then(() => alert('Партнер удален успешно'))
        .catch((error) => alert('Ошибка при удалении партнера: ' + error.message));
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

  const sortedPartners = sortData(partners, sortBy, sortOrder); 
  return (
    <div className="admin_panel_content">
      <div className="content_heading">
        <p className="small_title_text">Партнеры</p>
        <Link to="create_partner" className="blue_btn">Добавить партнера</Link>
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
                Ссылка
              </th>
              <th className="table_cell">
                Изображение
              </th>
              <th className="table_cell">
                Дата создания
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
                <td colSpan="4">Ошибка при загрузке партнеров</td>
              </tr>
            ) : (
                sortedPartners.map((partner) => (
                <tr key={partner.id}>
                  <td>{partner.id}</td>
                  <td className='title_td'>{partner.title}</td>
                  <td className='title_td'><a href={partner.link}>{partner.link}</a></td>
                  <td>
                    {partner.thumbnail_image ? (
                      <img
                        src={`http://localhost:8000${partner.thumbnail_image}`}
                        className="table_image"
                      />
                    ) : (
                      'Нет изображения'
                    )}
                  </td>
                  <td>
                    {new Date(partner.created_at).toLocaleString('ru-RU', {
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
                        id={partner.id}
                        currentOpenId={currentOpenId}
                        setCurrentOpenId={setCurrentOpenId}
                        onDelete={handleDelete}
                        onEdit={() => navigate(`edit_partner/${partner.id}`)}
                    />
                    </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>
      <div className="table_footer">Всего {partners.length} результатов</div>
    </div>
  );
}

export default AdminPanelPartners


