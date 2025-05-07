import React from 'react';
import { Link } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';

import sortIcon from "../../../../assets/img/icons/sort.png";
import ActionsPopup from '../../../common/ActionsPopup/ActionsPopup';
import { getArticles, deleteArticle } from '../../../../store/articlesSlice';
import EditorContentPreview from '../../../common/TextEditor/EditorContentPreview';
import { setSortBy, setSortOrder, sortData, toggleSortOrder  } from '../../../../store/tableSortSlice';

const AdminPanelArticle = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { articles, loading, error } = useSelector((state) => state.article);
  const [currentOpenId, setCurrentOpenId] = React.useState(null);
  const { sortBy, sortOrder } = useSelector((state) => state.tableSort);

  React.useEffect(() => {
    dispatch(getArticles());
  }, [dispatch]);

  const handleDelete = (articleId) => {
    if (window.confirm('Вы уверены, что хотите удалить эту статью?')) {
      dispatch(deleteArticle(articleId))
        .then(() => alert('Статья удалена успешно'))
        .catch((error) => alert('Ошибка при удалении статьи: ' + error.message));
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

  const sortedArticles = sortData(articles, sortBy, sortOrder); 
  console.log(sortedArticles); 
  return (
    <div className="admin_panel_content">
      <div className="content_heading">
        <p className="small_title_text">Статьи</p>
        <Link to="create_article" className="blue_btn">Добавить статью</Link>
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
                Текст
              </th>
              <th className="table_cell">
                Дата создания
                <img onClick={() => handleSort('date')} className="col_sort" src={sortIcon} alt="Sort" />
              </th>
              <th className="table_cell">
                Изображение
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
              sortedArticles.map((article) => (
                <tr key={article.id}>
                    <td>{article.id}</td>
                    <td>{article.title}</td>
                    <td><EditorContentPreview content={article.content} /></td>
                    <td className='date_td'>{new Date(article.created_at).toLocaleString('ru-RU', {
                        day: '2-digit',
                        month: '2-digit',
                        year: 'numeric',
                        hour: '2-digit',
                        minute: '2-digit',
                        hour12: false,
                    })}</td>
                    <td className="table_cell">
                    {article.main_image ? (
                      <img src={`http://localhost:8000${article.thumbnail_image}`} alt="Главное фото" loading='lazy' className="table_image" />
                    ) : (
                      'Нет изображения'
                    )}
                    </td>
                    <td>
                    <ActionsPopup
                        id={article.id}
                        currentOpenId={currentOpenId}
                        setCurrentOpenId={setCurrentOpenId}
                        onDelete={handleDelete}
                        onEdit={() => navigate(`edit_article/${article.id}`)}
                    />
                    </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>
      <div className="table_footer">Всего {articles.length} результатов</div>
    </div>
  )
}

export default AdminPanelArticle


