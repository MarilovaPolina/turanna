import React from "react";

import agent from '../../../assets/img/tour_agent.png';

function ApplicationFormSection(){
    return(
        <div className="application_form_block">
        <div className="container">
            <div className="application_form_content">
                <div className="application_form_part">
                    <p className="title_text">
                        Оставьте онлайн-заявку
                    </p>
                    <div className="application_form_part_content">
                        <p>
                            Просто расскажите, о каком путешествии мечтаете, а мы найдем для вас самые
                            интересные предложения. Никаких массовых рассылок, только индивидуальный подбор и
                            живое общение.
                        </p>

                        <form className="application_form_panel">
                            <select name="" id="" className="how_to_chat">
                                <option value="call">Позвоните мне</option>
                                <option value="chat">Напишите мне</option>
                            </select>

                            <div className="application_form">
                                <div className="form_group">
                                    <label>Как к вам обращаться? <span className="star">*</span></label>
                                    <input id="name" name="name" placeholder="Имя" required />
                                </div>

                                <div className="form_group">
                                    <label >Ваш номер телефона или ссылка на мессенджер <span
                                            className="star">*</span></label>
                                    <input id="phone" name="phone" placeholder="Телефон или ссылка" type="text"
                                        required />
                                </div>

                                <div className="form_group">
                                    <label>Когда вам будет комфортно обсудить поездку?</label>
                                    <select name="time" id="time">
                                        <option value="call">В любое время</option>
                                        <option value="morning">Утром (09:00 - 12:00)</option>
                                        <option value="afternoon">После обеда (12:00 - 17:00)</option>
                                        <option value="evening">Вечером (17:00 - 21:00)</option>
                                        <option value="weekend_morning">В выходные дни до 14:00</option>
                                        <option value="weekend_evening">В выходные дни после 14:00</option>
                                    </select>
                                </div>

                                <div className="form_group">
                                    <label >Желаемое направление</label>
                                    <input id="direction" name="direction"
                                        placeholder="Страна/город/курорт или другое" type="text" />
                                </div>

                                <button type="submit" className="orange_btn">Отправить</button>
                                <p className="substring">
                                    Нажимая кнопку «Отправить», я принимаю условия 
                                    <a href="#doc">Пользовательского соглашения</a> и подтверждаю <a
                                        href="#doc">согласие на обработку моих персональных данных</a>.
                                </p>
                            </div>
                        </form>
                    </div>

                </div>
                <div className="image_part">
                    <img src={agent} loading="lazy" />
                </div>
            </div>
        </div>
    </div>
    );
}

export default ApplicationFormSection;