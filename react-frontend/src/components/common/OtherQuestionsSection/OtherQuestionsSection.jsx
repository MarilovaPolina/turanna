import React from "react";

import vk from '../../../assets/img/icons/vk.png';
import wp from '../../../assets/img/icons/wp.png';
import inst from '../../../assets/img/icons/inst.png';
import tg from '../../../assets/img/icons/tg.png';
import phoneWhite from '../../../assets/img/icons/phone_white.png';

import handQuestion from '../../../assets/img/hand_question.png';

function OtherQuestionsSection(){
    return(
            <div className="other_questions_block">
                <div className="container">
                    <div className="other_questions_content">
                        <div className="other_questions_text">
                            <p className="title_text">Остались вопросы?</p>
                            <p className="other_questions_text_description">
                                Если у Вас возникли какие-либо вопросы или вы хотите получить больше информации о ваших
                                планах на отдых или ценах, обращайтесь к нам. Наша команда экспертов с радостью ответит
                                на все ваши вопросы.
                            </p>
                            <div className="contacts_for_question">
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
                                <div className="phone_panel">
                                    <img src={phoneWhite} loading="lazy" />
                                    <p className="phone_number_text">
                                        +7 (912) 751-51-11
                                    </p>
                                </div>
                            </div>
                        </div>
                        <div className="other_questions_img">
                            <img src={handQuestion} loading="lazy" />
                        </div>
                    </div>
                </div>
            </div>
    );
}

export default OtherQuestionsSection;