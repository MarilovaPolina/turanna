import React from "react";

import shieldIcon from '../../../../assets/img/icons/shield.png';
import fastIcon from '../../../../assets/img/icons/fast.png';
import firstIcon from '../../../../assets/img/icons/first.png';
import walletIcon from '../../../../assets/img/icons/wallet.png';

function WhyUsSection(){
    return(
        <div className="why_us_block">
            <div className="container">
                <p className="title_text">Почему мы?</p>
                <div className="why_us_content">
                    <div className="why_us_cards">

                        <div className="card why_us_card blue_why_us_card">
                            <img 
                                src={shieldIcon} 
                                alt="Надежность" 
                                loading="lazy" 
                            />
                            <div className="why_us_card_text">
                                <p className="small_title_text">
                                    надежно
                                </p>
                                <p>
                                    Сотрудничаем с лучшими туроператорами, все оформляем по договору и страхуем вашу
                                    поездку. Расскажем все детали честно и скрытых условий.
                                </p>
                            </div>
                        </div>

                        <div className="card why_us_card">
                            <img 
                                src={fastIcon} 
                                alt="Быстрота" 
                                loading="lazy" 
                            />
                            <div className="why_us_card_text">
                                <p className="small_title_text">
                                    быстро
                                </p>
                                <p>
                                    Всегда на связи — отвечаем за 15 минут и поддерживаем вас 24/7 в поездке. Решаем
                                    вопросы оперативно, чтобы ничего не испортило ваш отдых.
                                </p>
                            </div>
                        </div>


                        <div className="card why_us_card">
                            <img 
                                src={firstIcon} 
                                alt="Профессионализм" 
                                loading="lazy" 
                            />
                            <div className="why_us_card_text">
                                <p className="small_title_text">
                                    Профессионально
                                </p>
                                <p>
                                    Работаем с 2017 года, знаем все тонкости идеального отдыха и подберем тур с
                                    экспертной точностью. Опыт работы наших сотрудников в туризме более 20 лет.
                                </p>
                            </div>
                        </div>

                        <div className="card why_us_card blue_why_us_card">
                            <img 
                                src={walletIcon} 
                                alt="Выгода" 
                                loading="lazy" 
                            />
                            <div className="why_us_card_text">
                                <p className="small_title_text">
                                    Выгодно
                                </p>
                                <p>
                                    Мы предлагаем актуальные цены от проверенных партнеров. Выбирайте удобный способ
                                    оплаты, включая кредитование на выгодных условиях.
                                </p>
                            </div>
                        </div>

                    </div>
                    <div className="yandex_reviews">
                        <div style={{ width: '100%', overflow: 'hidden', position: 'relative' }}>
                            <iframe
                                style={{
                                    width: '100%',
                                    height: '100%',
                                    borderRadius: 'clamp(0.438rem, 0.178rem + 1.15vw, 1.563rem)',
                                    boxSizing: 'border-box'
                                }}
                                src="https://yandex.ru/maps-reviews-widget/136791543525?comments"
                                title="Яндекс Карты"
                            />
                            <a
                                href="https://yandex.ru/maps/org/turanna/136791543525/"
                                target="_blank"
                                rel="noopener noreferrer"
                                style={{
                                    boxSizing: 'border-box',
                                    textDecoration: 'none',
                                    color: '#b3b3b3',
                                    fontSize: '10px',
                                    fontFamily: 'YS Text, sans-serif',
                                    padding: '0 20px',
                                    position: 'absolute',
                                    bottom: '8px',
                                    width: '100%',
                                    textAlign: 'center',
                                    left: '0',
                                    overflow: 'hidden',
                                    textOverflow: 'ellipsis',
                                    display: 'block',
                                    maxHeight: '14px',
                                    whiteSpace: 'nowrap',
                                    padding: '0 16px',
                                    boxSizing: 'border-box'
                                }}
                            >
                                ТурАнна на карте Ижевска — Яндекс Карты
                            </a>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default WhyUsSection;