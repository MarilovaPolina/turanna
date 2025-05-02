import React from 'react';
import { Link } from 'react-router-dom';

import sortIcon from "../../../../assets/img/icons/sort.png";
import { useDispatch,useSelector } from 'react-redux';
import { getUsers } from '../../../../store/usersSlice';
import ActionsPopup from '../../../common/ActionsPopup/ActionsPopup';

const AdminPanelUsersContent = () => {
  const dispatch = useDispatch();
  const { users, loading, error } = useSelector(state => state.users); 
  const [currentOpenId, setCurrentOpenId] = React.useState(null);

  React.useEffect(() => {
    dispatch(getUsers()); 
  }, [dispatch]);
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
                <img className="col_sort" src={sortIcon} alt="Sort" />
              </th>
              <th className="table_cell">
                Имя
                <img className="col_sort" src={sortIcon} alt="Sort" />
              </th>
              <th className="table_cell">
                Эл. почта
                <img className="col_sort" src={sortIcon} alt="Sort" />
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
              users.map(user => (
                <tr className="table_row" key={user.id}>
                  <td className="table_cell">{user.id}</td>
                  <td className="table_cell">{user.name}</td>
                  <td className="table_cell">{user.email}</td>
                  <td className="table_cell">
                    <ActionsPopup 
                      userId={user.id}
                      currentOpenId={currentOpenId}
                      setCurrentOpenId={setCurrentOpenId}
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