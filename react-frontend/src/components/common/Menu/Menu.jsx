import React from "react";

function Menu({ onOpenPopup }){
    return(
        <div className="menu">
            <ul>
                <li><a href="#">Главная</a></li>
                <li><a href="#">Туры</a></li>
                <li><a href="#">О нас</a></li>
                <li><a href="#">Контакты</a></li>
                <li><a href="#">Отзывы</a></li>
                <li><a onClick={() => onOpenPopup('call')} className="pick_tour_btn">Подобрать тур</a></li>
            </ul>
        </div>
    );
}

export default Menu;