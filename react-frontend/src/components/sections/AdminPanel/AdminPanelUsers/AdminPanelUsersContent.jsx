import React from 'react';
import { Link } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';

import sortIcon from "../../../../assets/img/icons/sort.png";
import { getUsers, deleteUser } from '../../../../store/usersSlice';
import ActionsPopup from '../../../common/ActionsPopup/ActionsPopup';
import { setSortBy, setSortOrder, sortData, toggleSortOrder  } from '../../../../store/tableSortSlice';


const AdminPanelUsersContent = () => {
  const dispatch = useDispatch();
  const { users, loading, error } = useSelector(state => state.users); 
  const [currentOpenId, setCurrentOpenId] = React.useState(null);
  const { sortBy, sortOrder } = useSelector((state) => state.tableSort);

  React.useEffect(() => {
    dispatch(getUsers()); 
  }, [dispatch]);

  const handleDelete = (userId) => {
    if (window.confirm('Вы уверены, что хотите удалить этого пользователя?')) {
      dispatch(deleteUser(userId))
        .then(() => alert('Пользователь удален успешно'))
        .catch((error) => alert('Ошибка при удалении пользователя: ' + error.message));
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

  const sortedUsers = sortData(users, sortBy, sortOrder);
  
  return (
    <div className="admin_panel_content">
      <div className="content_heading">
        <p className="small_title_text">Пользователи</p>
        <Link to="create_user" className="blue_btn">Добавить пользователя</Link>
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
                Имя
                <img onClick={() => handleSort('name')} className="col_sort" src={sortIcon} alt="Sort" />
              </th>
              <th className="table_cell">
                Эл. почта
                <img onClick={() => handleSort('email')} className="col_sort" src={sortIcon} alt="Sort" />
              </th>
              <th className="table_cell"></th>
            </tr>
          </thead>
          <tbody>
            {loading ? (
              <tr><td colSpan="4">Загрузка...</td></tr>
            ) : error ? (
              <tr><td colSpan="4">Ошибка при загрузке пользователей</td></tr>
            ) : (
              sortedUsers.map(user => (
                <tr className="table_row" key={user.id}>
                  <td className="table_cell">{user.id}</td>
                  <td className="table_cell">{user.name}</td>
                  <td className="table_cell">{user.email}</td>
                  <td className="table_cell">
                    <ActionsPopup
                      id={user.id}
                      currentOpenId={currentOpenId}
                      setCurrentOpenId={setCurrentOpenId}
                      onDelete={handleDelete}
                      onEdit={() => console.log("edit")}
                    />
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
        <div className="table_footer">Всего {users.length} результатов</div>
      </div>
    </div>
  );
};

export default AdminPanelUsersContent;