import React from "react";
import { useOutletContext } from "react-router-dom";

import maldivesImg from '../../../../assets/img/maldives.png';
import kazanImg from '../../../../assets/img/kazan.png';
import schoolImg from '../../../../assets/img/school.png';
import healImg from '../../../../assets/img/heal.png';
import shipImg from '../../../../assets/img/ship.png';
import skiImg from '../../../../assets/img/ski.png';
import mountainImg from '../../../../assets/img/mountain.png';
import oxfordImg from '../../../../assets/img/oxford.png';

import palmIcon from '../../../../assets/img/icons/palm.png';
import grayArrowIcon from '../../../../assets/img/icons/gray_angle_arrow.png';
import cameraIcon from '../../../../assets/img/icons/camera.png';
import whiteArrowIcon from '../../../../assets/img/icons/white_angle_arrow.png';
import wheelIcon from '../../../../assets/img/icons/wheel.png';
import blueArrowIcon from '../../../../assets/img/icons/blue_angle_arrow.png';
import healIcon from '../../../../assets/img/icons/heal.png';
import bagIcon from '../../../../assets/img/icons/bag.png';
import airplaneIcon from '../../../../assets/img/icons/airplane.png';
import eduIcon from '../../../../assets/img/icons/edu.png';
import shipIcon from '../../../../assets/img/icons/ship.png';


function PopularDestinationsSection(){
    const { onOpenPopup } = useOutletContext();
    return(
        <div className="popular_destinations">
            <div className="container">
                <p className="title_text">популярные направления</p>
                <div className="popular_destinations_content">

                    <div onClick={() => onOpenPopup('call')} className="destination_card white_destination_card">
                        <div className="destination_card_image"
                            style={{backgroundImage: `url(${maldivesImg})`}}></div>
                        <div className="destination_card_icons">
                            <img src={palmIcon} alt="Пляжные туры" loading="lazy" />
                            <img src={grayArrowIcon} alt="Стрелка" />
                        </div>
                        <div className="destination_card_text">
                            <p className="small_title_text">ПЛЯЖНЫЕ ТУРЫ</p>
                            <p className="destination_card_description">Тепло моря, мягкость солнечных лучей и уют золотистых пляжей</p>
                        </div>
                    </div>

                    <div onClick={() => onOpenPopup('call')} className="destination_card image_button_card">
                        <div className="background_container" style={{backgroundImage: `url(${kazanImg})`}}>
                        </div>
                        <div className="destination_card_icons">
                            <img src={cameraIcon} alt="Экскурсии" loading="lazy" />
                            <img src={whiteArrowIcon} alt="Стрелка" />
                        </div>
                        <div className="destination_card_text">
                            <p className="small_title_text">экскурсионные ТУРЫ</p>
                            <p className="destination_card_description">Погружение в историю, увлекательные маршруты и новые открытия</p>
                        </div>
                    </div>

                    <div onClick={() => onOpenPopup('call')} className="destination_card blue_button_card">
                        <div className="destination_card_image" style={{backgroundImage: `url(${schoolImg})`}}>
                        </div>
                        <div className="destination_card_icons">
                            <img src={wheelIcon} alt="Школьные туры" loading="lazy" />
                            <img src={blueArrowIcon} alt="Стрелка" />
                        </div>
                        <div className="destination_card_text">
                            <p className="small_title_text">ТУРЫ для школьников</p>
                            <p className="destination_card_description">Исследование мира, увлекательные маршруты и познавательные активности</p>
                        </div>
                    </div>

                    <div onClick={() => onOpenPopup('call')} className="destination_card white_destination_card">
                        <div className="destination_card_image" style={{backgroundImage: `url(${healImg})`}}>
                        </div>
                        <div className="destination_card_icons">
                            <img src={healIcon} alt="Лечение" loading="lazy" />
                            <img src={grayArrowIcon} alt="Стрелка" />
                        </div>
                        <div className="destination_card_text">
                            <p className="small_title_text">Лечебные туры</p>
                            <p className="destination_card_description">Оздоровительные практики, медицинские процедуры и гармония с природой</p>
                        </div>
                    </div>

                    <div onClick={() => onOpenPopup('call')} className="destination_card blue_button_card">
                        <div className="destination_card_image" style={{backgroundImage: `url(${shipImg})`}}>
                        </div>
                        <div className="destination_card_icons">
                            <img src={shipIcon} alt="Круизы" loading="lazy" />
                            <img src={blueArrowIcon} alt="Стрелка" />
                        </div>
                        <div className="destination_card_text">
                            <p className="small_title_text">морские и Речные круизы</p>
                            <p className="destination_card_description">Морские горизонты и расслабляющая атмосфера на борту</p>
                        </div>
                    </div>

                    <div onClick={() => onOpenPopup('call')} className="destination_card white_destination_card">
                        <div className="destination_card_image" style={{backgroundImage: `url(${skiImg})`}}>
                        </div>
                        <div className="destination_card_icons">
                            <img src={bagIcon} alt="Горные лыжи" loading="lazy" />
                            <img src={grayArrowIcon} alt="Стрелка" />
                        </div>
                        <div className="destination_card_text">
                            <p className="small_title_text">горнолыжные ТУРЫ</p>
                            <p className="destination_card_description">Завораживающие снежные склоны, активный отдых и адреналин</p>
                        </div>
                    </div>

                    <div onClick={() => onOpenPopup('call')} className="destination_card image_button_card">
                        <div className="background_container" style={{backgroundImage: `url(${mountainImg})`}}>
                        </div>
                        <div className="destination_card_icons">
                            <img src={airplaneIcon} alt="Индивидуальные туры" loading="lazy" />
                            <img src={whiteArrowIcon} alt="Стрелка" />
                        </div>
                        <div className="destination_card_text">
                            <p className="small_title_text">индивидуальные туры</p>
                            <p className="destination_card_description">Персонализированные маршруты и уникальные впечатления ждут вас</p>
                        </div>
                    </div>

                    <div onClick={() => onOpenPopup('call')} className="destination_card blue_button_card">
                        <div className="destination_card_image" style={{backgroundImage: `url(${oxfordImg})`}}>
                        </div>
                        <div className="destination_card_icons">
                            <img src={eduIcon} alt="Образование" loading="lazy" />
                            <img src={grayArrowIcon} alt="Стрелка" />
                        </div>
                        <div className="destination_card_text">
                            <p className="small_title_text">Образование за рубежом</p>
                            <p className="destination_card_description">Погружение в новую культуру, ценные знания и вдохновляющие знакомства</p>
                        </div>
                    </div>

                </div>
            </div>
        </div>
    );
}

export default PopularDestinationsSection;