import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";

import logo from '../../assets/img/logo.png';
import Menu from "./Menu/Menu";

function Header({ onOpenPopup }) {
    const [isMenuOpen, setIsMenuOpen] = useState(false);

    useEffect(() => {
        const handleScroll = () => {
            const header = document.querySelector('.header');
            if (window.scrollY > 75) {
                header.classList.add('scrolled');
            } else {
                header.classList.remove('scrolled');
            }
        };
        window.addEventListener('scroll', handleScroll);
        return () => window.removeEventListener('scroll', handleScroll);
    }, []);

    const toggleMenu = () => {
        setIsMenuOpen(!isMenuOpen);
    };

    const closeMenu = () => {
        setIsMenuOpen(false);
    };

    return (
        <>
            <header className="header">
                <div className="container">
                    <div className="header_content">
                        <Link to="/">
                            <div className="logo_wrapper">
                                <img className="logo_img" src={logo} alt="Logo" />
                                <p className="logo_text">TURANNA ON-LINE</p>
                            </div>
                        </Link>

                        

                        {/* Обычное меню (показывается на десктопе) */}
                        <div className="menu_desktop">
                            <Menu onOpenPopup={onOpenPopup} />
                        </div>

                        {/* Бургер-иконка */}
                        <div
                            className={`burger_menu_ch ${isMenuOpen ? 'active' : ''}`}
                            onClick={toggleMenu}
                        >
                            <span></span>
                            <span></span>
                            <span></span>
                        </div>

                    </div>
                </div>
            </header>

            {/* Оверлей и мобильное меню */}
            <div className={`burger_menu_overlay ${isMenuOpen ? 'active' : ''}`} onClick={closeMenu}></div>

            <div className={`mobile_menu ${isMenuOpen ? 'active' : ''}`}>
                <div className="logo_wrapper">
                    <img className="logo_img" src={logo} alt="Logo" />
                    <p className="logo_text">TURANNA ON-LINE</p>
                </div>
                <Menu onOpenPopup={onOpenPopup} closeMenu={closeMenu} />
            </div>
        </>
    );
}

export default Header;
