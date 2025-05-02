import React from "react";

function Sidebar(){
    return(
        <>
            <button className="info_sheet_sidebar_btn">
                <p>Содержание</p>
                <img src="assets/img/icons/menu.png" />
            </button>

            <aside className="white_block info_sheet_sidebar">
                <p className="title_text">
                    Справка
                </p>
                <div className="sidebar_menu">
                    <ul className="sidebar_menu_ul">
                        <li><a href="#">
                                <p className="subtitle_text active">Оплата и возврат</p>
                            </a></li>
                        <li><a href="#">
                                <p className="subtitle_text">Страхование</p>
                            </a></li>
                        <li><a href="#">
                                <p className="subtitle_text">Кредитование</p>
                            </a></li>
                    </ul>
                </div>
            </aside>
        </>
    );
}

export default Sidebar;