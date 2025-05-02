import React from "react";

import logo from '../../assets/img/logo_with_text.png';

import vk from '../../assets/img/icons/vk.png';
import wp from '../../assets/img/icons/wp.png';
import inst from '../../assets/img/icons/inst.png';
import tg from '../../assets/img/icons/tg.png';

import Menu from "./Menu/Menu";

function Footer({ onOpenPopup }){
    return(
        <footer className="footer_block">
            <div className="black_footer_block">
                <div className="container">
                    <div className="logo_footer_part">
                        <img src={logo} />
                        <div className="logo_footer_text">
                            <p className="small_title_text">
                                turanna on-line
                            </p>
                            <p className="logo_footer_substring">
                                Онлайн-турагентство<br />
                                +7 (912) 751-51-11
                            </p>
                        </div>
                    </div>
                    <div className="menu_footer_part">
                        <Menu onOpenPopup={onOpenPopup} />
                    </div>
                </div>
            </div>
            <div className="blue_footer_block">
                <div className="container">
                    <p>© 2025 “ТурАнна”. Все права защищены</p>

                    <div className="social_media_panel">
                        <a href="https://vk.com/turanna2017?from=groups">
                            <img src={vk} loading="lazy" />
                        </a>

                        <a href="https://wa.me/79127515111">
                            <img src={wp} loading="lazy" />
                        </a>

                        <a href="https://www.instagram.com/turanna.ru?igsh=NzFhazFseTkzdXI4">
                            <img src={inst} loading="lazy" />
                        </a>

                        <a href="https://t.me/TurAnna">
                            <img src={tg} loading="lazy" />
                        </a>
                    </div>

                    <div className="footer_links">
                        <a href="#doc">Политика конфиденциальности и правовая информация</a>
                        <a href="#doc">Договор публичной оферты</a>
                    </div>
                </div>
            </div>
        </footer>
    );
}

export default Footer;