import React from "react";
import { useDispatch } from "react-redux";
import { createApplication } from "../../../store/applicationsSlice";

function ArticleForm() {
  const dispatch = useDispatch();
  const [communicationMethod, setCommunicationMethod] = React.useState("call");

  const handleMethodChange = (e) => {
    setCommunicationMethod(e.target.value);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const formData = new FormData(e.target);
    const data = {
      name: formData.get("name") || "",
      communication_method: formData.get("communication_method"),
      contacts: formData.get("phone") || "",
      communication_time: formData.get("time") || null,
      direction: "",
      budget: "",
      notes: formData.get("notes") || "",
      status: "new",
    };
    dispatch(createApplication(data));
    e.target.reset(); 
    alert("Вы успешно отправили заявку.\nОжидайте обратной связи — мы свяжемся в подходящее для вас время.\nСпасибо, что выбираете Туранна.");
  };

  return (
    <div className="article_form">
      <div className="article_form_text">
        <p className="small_title_text">понравился тур?</p>
        <p className="subtitle">
          Мы бесплатно ответим на вопросы и расскажем всё о туре, а вы решите, стоит ли его бронировать.
        </p>
      </div>

      <div className="article_form_white_block">
        <form className="application_form_panel" onSubmit={handleSubmit}>
          <div className="application_form">
            <div className="form_group">
              <select
                name="communication_method"
                className="how_to_chat"
                value={communicationMethod}
                onChange={handleMethodChange}
              >
                <option value="call">Позвоните мне</option>
                <option value="chat">Напишите мне</option>
              </select>
            </div>

            <div className="form_group">
              <label htmlFor="name">
                Как к вам обращаться? <span className="star">*</span>
              </label>
              <input id="name" name="name" placeholder="Имя" required />
            </div>

            <div className="form_group">
              <label htmlFor="phone">
                Ваш номер телефона или ссылка на мессенджер <span className="star">*</span>
              </label>
              <input
                id="phone"
                name="phone"
                placeholder="Телефон или ссылка"
                type="text"
                required
              />
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
              <label htmlFor="notes">Примечания</label>
              <textarea
                id="notes"
                name="notes"
                placeholder="Например: тихий отель, близко к морю..."
                rows="4"
              ></textarea>
            </div>

            <button type="submit" className="orange_btn">Отправить</button>
            <p className="substring">
              Нажимая кнопку «Отправить», я принимаю условия 
              <a href="#doc">Пользовательского соглашения</a> и подтверждаю <a href="#doc">согласие на обработку моих персональных данных</a>.
            </p>
          </div>
        </form>
      </div>
    </div>
  );
}

export default ArticleForm;
