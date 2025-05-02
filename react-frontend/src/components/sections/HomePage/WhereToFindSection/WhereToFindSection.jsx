import React from "react";

// Основные изображения направлений
import googleQr from '../../../../assets/img/google_qr.png';
import googleLogo from '../../../../assets/img/google_logo.png';
import yandexQr from '../../../../assets/img/yandex_qr.png';
import yandexLogo from '../../../../assets/img/yandex_logo.png';

// Иконки
import locaton from '../../../../assets/img/icons/location.png';
import watch from '../../../../assets/img/icons/watch.png';
import phoneBlack from '../../../../assets/img/icons/phone_black.png';


function WhereToFindSection(){
    return(
        <div className="where_to_find_block">
            <div className="container">
                <p className="title_text">
                    Как нас найти?
                </p>
                <div className="where_to_find_content">
                    <div className="contacts_block">
                        <div className="location_block">
                            <div className="address">
                                <img src={locaton} loading="lazy" />
                                <div className="contacts_text">
                                    <p className="small_title_text">
                                        Адрес:
                                    </p>
                                    <p>
                                        Ижевск, улица имени Вадима Сивкова, 150,<br />
                                        ТЦ Европа, 3 этаж, офис 1
                                    </p>
                                </div>
                            </div>
                            <div className="hours">
                                <img src={watch} loading="lazy" />
                                <div className="contacts_text">
                                    <p className="small_title_text">
                                        часы работы:
                                    </p>
                                    <p>
                                        Пн-вс: по заявке
                                    </p>
                                </div>
                            </div>
                            <div className="phone">
                                <img src={phoneBlack} loading="lazy" />
                                <div className="contacts_text">
                                    <p className="small_title_text">
                                        телефон:
                                    </p>
                                    <p>
                                        +7 (912) 751-51-11
                                        99-80-97
                                    </p>
                                </div>
                            </div>
                        </div>
                        <div className="google_qr">
                            <img src={googleQr} />
                            <img className="vk_label" src={googleLogo} />
                        </div>
                        <div className="yandex_qr">
                            <img src={yandexQr} />
                            <img className="vk_label" src={yandexLogo} />
                        </div>
                    </div>
                    <div className="map">
                    <div style={{ position: 'relative', overflow: 'hidden' }}>
                <a
                    href="https://yandex.ru/maps/org/turanna/136791543525/?utm_medium=mapframe&utm_source=maps"
                    style={{ color: '#eee', fontSize: '12px', position: 'absolute', top: '0px' }}
                >
                    ТурАнна
                </a>
        <a
            href="https://yandex.ru/maps/44/izhevsk/category/travel_agency/184106432/?utm_medium=mapframe&utm_source=maps"
            style={{ color: '#eee', fontSize: '12px', position: 'absolute', top: '14px' }}
        >
            Турагентство в Ижевске
        </a>
        <iframe
            src="https://yandex.ru/map-widget/v1/org/turanna/136791543525/?indoorLevel=3&ll=53.208891%2C56.841735&tilt=0.8726646259971648&z=17.4"
            width="100%"
            height="500"
            allowFullScreen 
            style={{ position: 'relative', borderRadius: '12px', marginTop: '0.9rem' }}
        />
        </div>

                            </div>
                        </div>
                    </div>
        </div>

    );
}

export default WhereToFindSection;