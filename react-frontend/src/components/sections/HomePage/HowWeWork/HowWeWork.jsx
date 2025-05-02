import React from "react";

import airplaneLandscape from '../../../../assets/img/airplane_landscape.png';
import resortLandscape from '../../../../assets/img/resort_landscape.png';

function HowWeWork(){
    return(
            <div className="how_we_work_block">
                <div className="container">
                    <p className="title_text">
                        как мы работаем?
                    </p>
                    <div className="how_we_work_content">
                        <div className="first_row">
                            <div className="card">
                                <p className="card_number">
                                    01
                                </p>
                                <p className="small_title_text">
                                    консультируем
                                </p>
                                <p className="how_we_work_card_description">
                                    Обсудим Ваши пожелания, интересы, бюджет и предпочтения. Выберем направление для
                                    отдыха, продолжительность поездки и уровень комфорта.
                                </p>
                            </div>
                            <div className="card">
                                <p className="card_number">
                                    02
                                </p>
                                <p className="small_title_text">
                                    создаем подборку
                                </p>
                                <p className="how_we_work_card_description">
                                    На основании собранной информации наш турагент найдет подходящие туры и/или отели и
                                    отправит вам подборку. Вам нужно будет только выбрать понравившиеся варианты.
                                </p>
                            </div>
                            <div className="picture_card">
                                <img src={airplaneLandscape} loading="lazy" />
                            </div>
                        </div>
                        <div className="second_row">
                            <div className="picture_card">
                                <img src={resortLandscape} loading="lazy" />
                            </div>
                            <div className="card">
                                <p className="card_number">
                                    03
                                </p>
                                <p className="small_title_text">
                                    Бронируем
                                </p>
                                <p className="how_we_work_card_description">
                                    После того, как выбор сделан, наш турагент оформляет все необходимые услуги:
                                    авиабилеты, гостиницы, трансферы и экскурсии. На этом этапе происходит оплата для
                                    завершения бронирования.
                                </p>
                            </div>
                            <div className="card">
                                <p className="card_number">
                                    04
                                </p>
                                <p className="small_title_text">
                                    Информируем и поддерживаем
                                </p>
                                <p className="how_we_work_card_description">
                                    Наш турагент предоставляет всю информацию о поездке, включая рекомендации по месту
                                    назначения. Также мы всегда готовы поддержать клиентов в непредвиденных ситуациях.
                                </p>
                            </div>
                        </div>
                    </div>

                </div>
            </div>
    );
}

export default HowWeWork;