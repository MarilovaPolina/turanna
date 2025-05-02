import React from "react";
import { useOutletContext } from "react-router-dom";

import egyptImage from '../../../../assets/img/egypt.png';
import calendarIcon from '../../../../assets/img/icons/calendar.png';
import moonSmallIcon from '../../../../assets/img/icons/moon_small.png';
import hotelIcon from '../../../../assets/img/icons/hotel.png';
import birthdayIcon from '../../../../assets/img/icons/birthday.png';
import bedIcon from '../../../../assets/img/icons/bed.png';
import plateIcon from '../../../../assets/img/icons/plate.png';
import infoIcon from '../../../../assets/img/icons/info.png';
import whiteAngleArrowIcon from '../../../../assets/img/icons/white_angle_arrow.png';

function TourVariantWrapper() {
    const { onOpenPopup } = useOutletContext();
    
    return (
        <div className="variant_wrapper">
            <div className="variant_image">
                <img src={egyptImage} alt="Египет, Хургада" loading="lazy" />
            </div>

            <div className="variant_info_card">
                <div className="variant_heading_block">
                    <p className="small_title_text">
                        Egypt beach resort 4* 
                    </p>
                    <p className="article_number">
                        БАЙ128-10023-EBR
                    </p>
                </div>
                
                <div className="variant_card_route">
                    <p>
                        Казань ⭢ Египет, Хургада
                    </p>
                </div>
                
                <div className="variant_info_card_content">
                    <div className="about_tour">
                        <div className="details_block">
                            <div className="details_block_image_part">
                                <img src={calendarIcon} alt="Начало тура" />
                            </div>
                            <div className="details_text_part">
                                <p className="substring">
                                    Начало тура
                                </p>
                                <p className="details_content">
                                    30 января 2025 г.
                                </p>
                            </div>
                        </div>

                        <div className="details_block">
                            <div className="details_block_image_part">
                                <img src={calendarIcon} alt="Последний день" />
                            </div>
                            <div className="details_text_part">
                                <p className="substring">
                                    Посл. день
                                </p>
                                <p className="details_content">
                                    6 февраля 2025 г.
                                </p>
                            </div>
                        </div>

                        <div className="details_block">
                            <div className="details_block_image_part">
                                <img src={moonSmallIcon} alt="Количество ночей" />
                            </div>
                            <div className="details_text_part">
                                <p className="substring">
                                    Количество ночей
                                </p>
                                <p className="details_content">
                                    7 ночей
                                </p>
                            </div>
                        </div>
                    </div>

                    <div className="about_accommodation">
                        <div className="details_block">
                            <div className="details_block_image_part">
                                <img src={hotelIcon} alt="Название отеля" />
                            </div>
                            <div className="details_text_part">
                                <p className="substring">
                                    Название отеля
                                </p>
                                <p className="details_content">
                                    Egypt Beach Resort 4*
                                </p>
                            </div>
                        </div>

                        <div className="details_block">
                            <div className="details_block_image_part">
                                <img src={birthdayIcon} alt="Возрастное ограничение" />
                            </div>
                            <div className="details_text_part">
                                <p className="substring">
                                    Возрастное ограничение
                                </p>
                                <p className="details_content">
                                    12+, 12+
                                </p>
                            </div>
                        </div>

                        <div className="details_block">
                            <div className="details_block_image_part">
                                <img src={bedIcon} alt="Класс номера" />
                            </div>
                            <div className="details_text_part">
                                <p className="substring">
                                    Класс номера
                                </p>
                                <p className="details_content">
                                    Standard room
                                </p>
                            </div>
                        </div>

                        <div className="details_block">
                            <div className="details_block_image_part">
                                <img src={plateIcon} alt="Питание" />
                            </div>
                            <div className="details_text_part">
                                <p className="substring">
                                    Все включено
                                    <img className="info_label" src={infoIcon} alt="Информация" />
                                </p>
                                <p className="details_content">
                                    Есть
                                </p>
                            </div>
                        </div>
                    </div>
                    
                    <div className="price_block">
                        <div className="price_part">
                            <p className="small_title_text">
                                от 258 200 ₽
                            </p>
                            <p className="substring">
                                цена за двоих
                            </p>
                        </div>
                        <div className="know_more">
                            <button className="blue_btn" onClick={() => onOpenPopup('call')}>
                                <p>Узнать больше</p>
                                <img src={whiteAngleArrowIcon} alt="Стрелка" />
                            </button>
                        </div>
                    </div>
                </div>
            </div>
            
            <p className="substring copyright">Фото от <a href="#">Кононова Валерия Игоревна</a></p>
        </div>
    );
}

export default TourVariantWrapper;