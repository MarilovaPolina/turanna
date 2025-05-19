import React from "react";
import { useDispatch } from "react-redux";
import { createApplication } from "../../../store/applicationsSlice";

import agent from "../../../assets/img/tour_agent.png";

function ApplicationFormSection() {
  const dispatch = useDispatch();
  const [chosenCommunicationMethod, setChosenCommunicationMethod] = React.useState("call");

  const handleMethodChange = (e) => {
    setChosenCommunicationMethod(e.target.value);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const formData = new FormData(e.target);
    const data = {
      name: formData.get("name") || "",
      communication_method: chosenCommunicationMethod,
      contacts: formData.get("phone") || "",
      communication_time: formData.get("time") || null,
      direction: formData.get("direction") || "",
      budget: formData.get("budget") || "",
      notes: formData.get("notes") || "",
      status: "new",
    };

    dispatch(createApplication(data));
    e.target.reset(); 
    alert("Вы успешно отправили заявку.\nОжидайте обратной связи — мы свяжемся в подходящее для вас время.\nСпасибо, что выбираете Туранна.")
  };

  return (
    <div className="application_form_block">
      <div className="container">
        <div className="application_form_content">
          <div className="application_form_part">
            <p className="title_text">Оставьте онлайн-заявку</p>
            <div className="application_form_part_content">
              <p>
                Просто расскажите, о каком путешествии мечтаете, а мы найдем для вас самые интересные предложения.
                Никаких массовых рассылок, только индивидуальный подбор и живое общение.
              </p>

              <form className="application_form_panel" onSubmit={handleSubmit}>
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
                    <label>Как к вам обращаться? <span className="star">*</span></label>
                    <input id="name" name="name" placeholder="Имя" required />
                  </div>

                  <div className="form_group">
                    <label>Ваш номер телефона или ссылка на мессенджер <span className="star">*</span></label>
                    <input id="phone" name="phone" placeholder="Телефон или ссылка" type="text" required />
                  </div>

                  <div className="form_group">
                    <label>Когда вам будет комфортно обсудить поездку?</label>
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
                    <label>Желаемое направление</label>
                    <input id="direction" name="direction" placeholder="Страна/город/курорт или другое" type="text" />
                  </div>

                  <div className="form_group">
                    <label>Рамки бюджета</label>
                    <input id="budget" name="budget" placeholder="50 000 ₽" type="text" />
                  </div>

                  <div className="form_group">
                    <label>Примечания</label>
                    <textarea id="notes" name="notes" placeholder="Например: ранний завтрак, номер на высоком этаже..." rows="4"></textarea>
                  </div>

                  <button type="submit" className="orange_btn">Отправить</button>
                  <p className="substring">
                    Нажимая кнопку «Отправить», я принимаю условия <a href="#doc">Пользовательского соглашения</a> и подтверждаю <a href="#doc">согласие на обработку моих персональных данных</a>.
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
