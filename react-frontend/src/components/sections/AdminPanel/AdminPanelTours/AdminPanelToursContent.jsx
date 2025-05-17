import React from 'react'; 
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate, Link } from 'react-router-dom';

import ActionsPopup from '../../../common/ActionsPopup/ActionsPopup';
import { getAllTours, deleteTour } from '../../../../store/tourPackagesSlice';
import sortIcon from "../../../../assets/img/icons/sort.png";
import { setSortBy, setSortOrder, sortData, toggleSortOrder } from '../../../../store/tableSortSlice';

const AdminPanelToursContentContent = () => {
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const { loading, error } = useSelector((state) => state.tourPackage);
    const toursList = useSelector((state) => state.tourPackage.toursList);
    const [currentOpenId, setCurrentOpenId] = React.useState(null);
    const { sortBy, sortOrder } = useSelector((state) => state.tableSort);

    React.useEffect(() => {
        dispatch(getAllTours());
    }, [dispatch]);

    const handleDelete = (tourId) => {
        if (window.confirm('Вы уверены, что хотите удалить этот тур?')) {
            dispatch(deleteTour(tourId))
                .then(() => alert('Тур удален успешно'))
                .catch((error) => alert('Ошибка при удалении тура: ' + error.message));
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

    const sortedTours = sortData(toursList, sortBy, sortOrder); 

    return (       
        <>
            <div className="admin_panel_content">
                <div className="content_heading">
                    <p className="small_title_text">Туры</p>
                    <Link to="create_tour_package" className="blue_btn">Добавить подборку</Link>
                </div>
                
                <div className="table_container">
                    <table className="data_table">
                        <thead>
                            <tr className="table_row">
                                <th className="table_cell">ID <img onClick={() => handleSort('id')} className="col_sort" src={sortIcon} alt="Sort" /></th>
                                <th className="table_cell">Артикул <img onClick={() => handleSort('article_number')} className="col_sort" src={sortIcon} alt="Sort" /></th>
                                <th className="table_cell">Отель <img onClick={() => handleSort('hotel_name')} className="col_sort" src={sortIcon} alt="Sort" /></th>
                                <th className="table_cell">Страна <img onClick={() => handleSort('arrival_country')} className="col_sort" src={sortIcon} alt="Sort" /></th>
                                <th className="table_cell">Отправление<img onClick={() => handleSort('departure_city')} className="col_sort" src={sortIcon} alt="Sort" /></th>
                                <th className="table_cell">Прибытие <img onClick={() => handleSort('arrival_city')} className="col_sort" src={sortIcon} alt="Sort" /></th>
                                <th className="table_cell">Начало <img onClick={() => handleSort('start_date')} className="col_sort" src={sortIcon} alt="Sort" /></th>
                                <th className="table_cell">Окончание <img onClick={() => handleSort('end_date')} className="col_sort" src={sortIcon} alt="Sort" /></th>
                                <th className="table_cell">Цена <img onClick={() => handleSort('price')} className="col_sort" src={sortIcon} alt="Sort" /></th>
                                <th className="table_cell"></th>
                            </tr>
                        </thead>
                        <tbody>
                            {loading ? (
                                <tr>
                                <td colSpan="10">Загрузка...</td>
                                </tr>
                            ) : error ? (
                                <tr>
                                <td colSpan="10">Ошибка при загрузке туров</td>
                                </tr>
                            ) : (
                                sortedTours.map((tour) => (
                                <tr
                                    key={tour.id}
                                    className={`table_row ${tour.status === 'expired' ? 'finished' : ''}`}
                                >
                                    <td className="table_cell">{tour.id}</td>
                                    <td className="table_cell">{tour.article_number || '–'}</td>
                                    <td className="table_cell">{tour.hotel_name || '–'}</td>
                                    <td className="table_cell">{tour.arrival_country || '–'}</td>
                                    <td className="table_cell">{tour.departure_city || '–'}</td>
                                    <td className="table_cell">{tour.arrival_city || '–'}</td>
                                    <td className="table_cell">{tour.start_date ? new Date(tour.start_date).toLocaleDateString('ru-RU') : '–'}</td>
                                    <td className="table_cell">{tour.end_date ? new Date(tour.end_date).toLocaleDateString('ru-RU') : '–'}</td>
                                    <td className="table_cell">{tour.price ? `от ${Number(tour.price).toLocaleString('ru-RU')} ₽` : '–'}</td>
                                    <td className="table_cell">
                                    <ActionsPopup
                                        id={tour.id}
                                        currentOpenId={currentOpenId}
                                        setCurrentOpenId={setCurrentOpenId}
                                        onDelete={handleDelete}
                                        onEdit={() => navigate(`edit_tour_package/${tour.tour_package_id}`)}
                                    />
                                    </td>
                                </tr>
                                ))
                            )}
                            </tbody>
                    </table>
                    <div className="table_footer">
                        Всего {toursList.length} результатов
                    </div>
                </div>
            </div>
        </>
    );
};

export default AdminPanelToursContentContent;
