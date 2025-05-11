import React from "react";
import ReactDOM from "react-dom";
import { useDispatch } from "react-redux";
import { createApplication } from "../../../store/applicationsSlice";

import closeImg from '../../../assets/img/icons/close.png';
import womanBeachImg from '../../../assets/img/woman_beach.png';

const application_popup = document.getElementById("application_popup");

function ApplicationPopup({ isOpen, onClose, communicationMethod }) {
    const dispatch = useDispatch();
    const [chosenCommunicationMethod, setChosenCommunicationMethod] = React.useState(communicationMethod);
    
    React.useEffect(() => {
        setChosenCommunicationMethod(communicationMethod);
    }, [communicationMethod]);

    const handleMethodChange = (e) => {
        setChosenCommunicationMethod(e.target.value);
    };

    // Отправка заявки
    const handleSubmit = (e) => {
        e.preventDefault();
        const formData = new FormData(e.target);
        const data = {
          name: formData.get('name') || '',
          communication_method: formData.get('communication_method'),
          contacts: formData.get('phone') || formData.get('contact') || '',
          communication_time: formData.get('time') || null,
          direction: formData.get('direction') || '',
          budget: formData.get('budget') || '',
          notes: formData.get('notes') || '',
          status: 'new',
        };
        dispatch(createApplication(data));
        onClose(); 
      };

    if (!isOpen) return null;

    return (
        ReactDOM.createPortal(
            <div className="popup_block">
                <div className="application_popup active">
                    <div onClick={onClose} className="close_button">
                        <img src={closeImg} alt="Close" />
                    </div>
                    <div className="popup_content">
                        <div className="popup_form_block">
                            {chosenCommunicationMethod === 'call' ? (
                                <>
                                    <div className="popup_form_block_text">
                                        <p className="small_title_text">
                                            подберем тур<br />специально для вас
                                        </p>
                                        <p className="subtitle">
                                            Никаких рассылок – только звонок, чтобы обсудить вашу идеальную поездку.
                                        </p>
                                    </div>

                                    <form onSubmit={handleSubmit} className="application_form_panel">
                                        <select 
                                            name="communication_method" 
                                            className="how_to_chat"
                                            value={chosenCommunicationMethod}
                                            onChange={handleMethodChange}
                                        >
                                            <option value="call">Позвоните мне</option>
                                            <option value="chat">Напишите мне</option>
                                        </select>

                                        <div className="application_form">
                                            <div className="form_group">
                                                <label htmlFor="name">Как к вам обращаться? <span className="star">*</span></label>
                                                <input id="name" name="name" placeholder="Имя" required />
                                            </div>

                                            <div className="form_group">
                                                <label htmlFor="phone">Телефон <span className="star">*</span></label>
                                                <input id="phone" name="phone" placeholder="8 (___) ___-__-__" type="text" required/>
                                            </div>

                                            <div className="form_group">
                                                <label htmlFor="time">Когда вам будет комфортно обсудить поездку?</label>
                                                <select name="time" id="time">
                                                    <option value="В любое время">В любое время</option>
                                                    <option value="Утром (09:00 - 12:00)">Утром (09:00 - 12:00)</option>
                                                    <option value="После обеда (12:00 - 17:00)">После обеда (12:00 - 17:00)</option>
                                                    <option value="Вечером (17:00 - 21:00)">Вечером (17:00 - 21:00)</option>
                                                    <option value="В выходные дни до 14:00">В выходные дни до 14:00</option>
                                                    <option value="В выходные дни после 14:00">В выходные дни после 14:00</option>
                                                </select>
                                            </div>

                                            <div className="form_group">
                                                <label htmlFor="direction">Желаемое направление</label>
                                                <input id="direction" name="direction" placeholder="Страна/город/курорт или другое" type="text" />
                                            </div>

                                            <button type="submit" className="orange_btn">Отправить</button>
                                            <p className="substring">
                                                Нажимая кнопку «Отправить», я принимаю условия 
                                                <a href="#doc">Пользовательского соглашения</a> и подтверждаю <a href="#doc">согласие на обработку моих персональных данных</a>.
                                            </p>
                                        </div>
                                    </form>
                                </>
                            ) : (
                                <>
                                    <div className="popup_form_block_text">
                                        <p className="small_title_text">
                                            подберем тур<br />специально для вас
                                        </p>
                                        <p className="subtitle">
                                            Оставьте имя и ссылку на ваш аккаунт для связи – это бесплатно и ни к чему не обязывает.
                                        </p>
                                    </div>

                                    <form onSubmit={handleSubmit} className="application_form_panel">
                                        <select 
                                            name="communication_method" 
                                            className="how_to_chat"
                                            value={chosenCommunicationMethod}
                                            onChange={handleMethodChange}
                                        >
                                            <option value="call">Позвоните мне</option>
                                            <option value="chat">Напишите мне</option>
                                        </select>

                                        <div className="application_form">
                                            <div className="form_group">
                                                <label htmlFor="name">Как к вам обращаться? <span className="star">*</span></label>
                                                <input id="name" name="name" placeholder="Имя" required />
                                            </div>

                                            <div className="form_group">
                                                <label htmlFor="contact">Ссылка на мессенджер, почту или соц. сеть <span className="star">*</span></label>
                                                <input id="contact" name="contact" placeholder="Место, где вам удобно получить подборку" type="text" required/>
                                            </div>

                                            <div className="form_group">
                                                <label htmlFor="budget">Рамки бюджета</label>
                                                <input id="budget" name="budget" placeholder="50 000 ₽" type="text" />
                                            </div>

                                            <div className="form_group">
                                                <label htmlFor="direction">Желаемое направление</label>
                                                <input id="direction" name="direction" placeholder="Страна/город/курорт или другое" type="text" />
                                            </div>

                                            <div className="form_group">
                                                <label htmlFor="notes">Примечания</label>
                                                <textarea id="notes" name="notes" placeholder="Например: ранний завтрак, номер на высоком этаже, тихий отель, близко к морю, уроки серфинга" rows="4"></textarea>
                                            </div>

                                            <button type="submit" className="orange_btn">Отправить</button>
                                            <p className="substring">
                                                Нажимая кнопку «Отправить», я принимаю условия 
                                                <a href="#doc">Пользовательского соглашения</a> и подтверждаю <a href="#doc">согласие на обработку моих персональных данных</a>.
                                            </p>
                                        </div>
                                    </form>
                                </>
                            )}
                        </div>

                        <div className="popup_form_block_image">
                            <img src={womanBeachImg} />
                        </div>
                    </div>
                </div>
                <div className="overlay"></div>
            </div>, 
        application_popup)
    );
}

export default ApplicationPopup;