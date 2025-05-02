import React from "react";

import vkLabelImg from '../../../../assets/img/vk_label.png';
import vkQrImg from '../../../../assets/img/vk_qr.png';
import vkLogoImg from '../../../../assets/img/vk_logo.png';
import vkPhoneImg from '../../../../assets/img/vk_phone.png';

function ReviewsVkSection(){
    const items = new Array(20).fill('TURANNA ON-LINE'); 
    
    return(
        <div className="reviews_vk_block">
            <div className="ticker">
                <div className="ticker__in">
                    {items.map((item, index) => (
                        <span key={index} className="ticker__item small_title_text">
                            {index % 2 === 0 ? '★' : item}
                        </span>
                    ))}
                </div>
            </div>

            <div className="reviews_vk">
                <div className="container">
                    <div className="reviews_vk_text">
                        <p className="title_text">
                            сотни реальных отзывов и <br />свежие обновления
                        </p>
                        <p className="subtitle_text">
                            В нашем паблике
                            <img 
                                className="vk_tabel_text" 
                                src={vkLabelImg} 
                                alt="ВКонтакте" 
                            />
                            мы регулярно обновляем информацию о лучших отелях, интересных мероприятиях и уникальных
                            предложениях. Присоединяйтесь к нам и вдохновляйтесь на новые приключения.
                        </p>

                        <div className="vk_links">
                            <div className="vk_qr_block">
                                <img 
                                    src={vkQrImg} 
                                    alt="QR-код ВКонтакте" 
                                />
                                <img 
                                    className="vk_label" 
                                    src={vkLabelImg} 
                                    alt="ВКонтакте" 
                                />
                            </div>

                            <div className="vk_link_block">
                                <a className="vk_link_block_content" href="https://vk.com/turanna2017" target="_blank" rel="noopener noreferrer">
                                    <img 
                                        src={vkLogoImg} 
                                        alt="Логотип ВКонтакте" 
                                    />
                                    <div className="vk_link_block_text">
                                        <p className="small_title_text">
                                            "ТурАнна" Агентство Путешествий
                                        </p>
                                        <p className="link">https://vk.com/turanna2017</p>
                                    </div>
                                </a>
                            </div>
                        </div>
                    </div>
                    <div className="reviews_vk_image">
                        <img 
                            src={vkPhoneImg} 
                            alt="Превью страницы ВКонтакте" 
                            loading="lazy" 
                        />
                    </div>
                </div>
            </div>

            <div className=" ticker second_tiсker">
                <div className="ticker__in">
                    {items.map((item, index) => (
                        <span key={index} className="ticker__item small_title_text">
                            {index % 2 === 0 ? '★' : item}
                        </span>
                    ))}
                </div>
            </div>
        </div>
    );
}

export default ReviewsVkSection;