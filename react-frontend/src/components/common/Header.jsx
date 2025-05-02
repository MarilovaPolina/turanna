import React from "react";

import logo from '../../assets/img/logo.png';

import Menu from "./Menu/Menu";

function Header({ onOpenPopup }){
    React.useEffect(() => {
        const handleScroll = () => {
            const header = document.querySelector('.header');
            if (window.scrollY > 75) {
                header.classList.add('scrolled');
            } else {
                header.classList.remove('scrolled');
            }
        };

        window.addEventListener('scroll', handleScroll);

        return () => {
            window.removeEventListener('scroll', handleScroll);
        };
    }, []); 

    return(
        <header className="header">
            <div className="container">
                <div className="header_content">
                    <div className="logo_wrapper">
                        <img className="logo_img" src={logo} />
                        <p className="logo_text">TURANNA ON-LINE</p>
                    </div>

                    <Menu onOpenPopup={onOpenPopup} />
                </div>
            </div>
        </header>
    );
}

export default Header;