import React from 'react';
import sortIcon from "../../../../assets/img/icons/sort.png";


const AdminPanelToursContentContent = () => {
    return (
        
        <>
            <div className="admin_panel_content">
                <div className="content_heading">
                    <p className="small_title_text">
                        Туры
                    </p>
                    <a href="#" className="blue_btn">
                        Добавить пост
                    </a>
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
                                    Артикул
                                    <img className="col_sort" src={sortIcon} alt="Sort" />
                                </th>
                                <th className="table_cell">
                                    Место
                                    <img className="col_sort" src={sortIcon} alt="Sort" />
                                </th>
                                <th className="table_cell">
                                    Маршрут
                                    <img className="col_sort" src={sortIcon} alt="Sort" />
                                </th>
                                <th className="table_cell">
                                    Цена
                                    <img className="col_sort" src={sortIcon} alt="Sort" />
                                </th>
                                <th className="table_cell">
                                    Начало
                                    <img className="col_sort" src={sortIcon} alt="Sort" />
                                </th>
                                <th className="table_cell">
                                    Посл. день
                                    <img className="col_sort" src={sortIcon} alt="Sort" />
                                </th>
                                <th className="table_cell">
                                    Ночей
                                    <img className="col_sort" src={sortIcon} alt="Sort" />
                                </th>
                                <th className="table_cell">
                                    Отель
                                    <img className="col_sort" src={sortIcon} alt="Sort" />
                                </th>
                                <th className="table_cell">
                                    Статус
                                    <img className="col_sort" src={sortIcon} alt="Sort" />
                                </th>
                                <th className="table_cell">Изображение</th>
                                <th className="table_cell"></th>
                            </tr>
                        </thead>
                        <tbody>
                            <tr className="table_row">
                                <td className="table_cell">128</td>
                                <td className="table_cell">БАЙ128-10023</td>
                                <td className="table_cell">БАЙКАЛ</td>
                                <td className="table_cell">Казань - Байкал</td>
                                <td className="table_cell">от<br /> 29 143 ₽</td>
                                <td className="table_cell">10 фев</td>
                                <td className="table_cell">10 фев</td>
                                <td className="table_cell">3 ночей</td>
                                <td className="table_cell">–</td>
                                <td className="table_cell">Актуально</td>
                                <td className="table_cell">
                                    <img src="https://svoe-zagorodom.ru/blog/wp-content/uploads/2024/06/bajkalchik.jpg" alt="img" className="table_image" />
                                </td>
                                <td className="table_cell table_actions">...</td>
                            </tr>
                            <tr className="table_row finished">
                                <td className="table_cell">129</td>
                                <td className="table_cell">БАЙ128-10023-EBR</td>
                                <td className="table_cell">ЕГИПЕТ</td>
                                <td className="table_cell">Казань - Шарм-эль-Шейх</td>
                                <td className="table_cell">от<br /> 258 200 ₽/чел</td>
                                <td className="table_cell">30 окт</td>
                                <td className="table_cell">30 дек</td>
                                <td className="table_cell">7 ночей</td>
                                <td className="table_cell">Egypt Beach Resort 4*</td>
                                <td className="table_cell">Закончился</td>
                                <td className="table_cell">
                                    <img src="https://library.vladimir.ru/wp-content/uploads/2017/03/%D0%B1%D0%B0%D0%B9.jpg" alt="img" className="table_image" />
                                </td>
                                <td className="table_cell table_actions">...</td>
                            </tr>
                            <tr className="table_row">
                                <td className="table_cell">130</td>
                                <td className="table_cell">БАЙ128-10023-EBR</td>
                                <td className="table_cell">ОАЭ</td>
                                <td className="table_cell">Казань - Шарджа</td>
                                <td className="table_cell">от<br /> 152 200 ₽/чел</td>
                                <td className="table_cell">17 янв</td>
                                <td className="table_cell">17 янв</td>
                                <td className="table_cell">7 ночей</td>
                                <td className="table_cell">Egypt Beach Resort 4*</td>
                                <td className="table_cell">Актуально</td>
                                <td className="table_cell">
                                    <img src="https://fanatbaikala.ru/img/tours/62.jpg" alt="img" className="table_image" />
                                </td>
                                <td className="table_cell table_actions">...</td>
                            </tr>
                        </tbody>
                    </table>
                    
                    <div className="table_footer">
                        Всего 3 результата
                    </div>
                </div>
            </div>
        </>
    );
};

export default AdminPanelToursContentContent;