import React from "react";
import { Link, useNavigate } from "react-router-dom";

function Menu({ onOpenPopup, closeMenu }) {
    const navigate = useNavigate();

    const handleLinkClick = (to) => {
        navigate(to);
        if (closeMenu) closeMenu();
    };

    return (
        <div className="menu">
            <ul>
                <li><Link onClick={() => handleLinkClick("/")}>Главная</Link></li>
                <li><Link onClick={() => handleLinkClick("/posts")}>Туры</Link></li>
                <li><Link onClick={() => handleLinkClick("/about_us")}>О нас</Link></li>
                <li><Link onClick={() => handleLinkClick("/#contacts")}>Контакты</Link></li>
                <li><Link to="https://vk.com/topic-140144964_35076889?offset=120" target="_blank">Отзывы</Link></li>
                <li className="get_tour_btn"><a onClick={() => { onOpenPopup("call"); if (closeMenu) closeMenu(); }} className="pick_tour_btn">Подобрать тур</a></li>
            </ul>
        </div>
    );
}

export default Menu;
