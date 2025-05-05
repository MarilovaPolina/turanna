import React from 'react';
import { Link } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';

import sortIcon from "../../../../assets/img/icons/sort.png";
import ActionsPopup from '../../../common/ActionsPopup/ActionsPopup';
import { getInfoSheets, deleteInfoSheet } from '../../../../store/infoSheetSlice';
import EditorContentPreview from '../../../common/TextEditor/EditorContentPreview';

const AdminPanelInfoSheet = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { infoSheets, loading, error } = useSelector((state) => state.infoSheet);
  const [currentOpenId, setCurrentOpenId] = React.useState(null);

  React.useEffect(() => {
    dispatch(getInfoSheets());
  }, [dispatch]);

  const handleDelete = (infoSheetId) => {
    if (window.confirm('Вы уверены, что хотите удалить эту справку?')) {
      dispatch(deleteInfoSheet(infoSheetId))
        .then(() => alert('Справка удалена успешно'))
        .catch((error) => alert('Ошибка при удалении справки: ' + error.message));
    }
  };

  return (
    <div className="admin_panel_content">
      <div className="content_heading">
        <p className="small_title_text">Справочная информация</p>
        <Link to="create_info_sheet" className="blue_btn">Добавить справку</Link>
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
                Заголовок
                <img className="col_sort" src={sortIcon} alt="Sort" />
              </th>
              <th className="table_cell">
                Текст
                <img className="col_sort" src={sortIcon} alt="Sort" />
              </th>
              <th className="table_cell">
                Дата создания
                <img className="col_sort" src={sortIcon} alt="Sort" />
              </th>
              <th className="table_cell"></th>
            </tr>
          </thead>
          <tbody>
            {loading ? (
              <tr><td colSpan="4">Загрузка...</td></tr>
            ) : error ? (
              <tr><td colSpan="4">Ошибка при загрузке справочной информации</td></tr>
            ) : (
              infoSheets.map((infoSheet) => (
                <tr key={infoSheet.id}>
                  <td>{infoSheet.id}</td>
                  <td>{infoSheet.title}</td>
                  <td><EditorContentPreview content={infoSheet.content} /></td>
                  <td>{new Date(infoSheet.created_at).toLocaleDateString()}</td>
                  <td>
                    <ActionsPopup
                      id={infoSheet.id}
                      currentOpenId={currentOpenId}
                      setCurrentOpenId={setCurrentOpenId}
                      onDelete={handleDelete}
                      onEdit={() => navigate(`edit_info_sheet/${infoSheet.id}`)}
                    />
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
        <div className="table_footer">Всего {infoSheets.length} результатов</div>
      </div>
    </div>
  )
}

export default AdminPanelInfoSheet


