import React from "react";

function ArticleForm(){
    return(
        <>
            <div className="article_form">
                <div className="article_form_text">
                    <p className="small_title_text">
                        понравился тур?
                    </p>
                    <p className="subtitle">
                        Мы бесплатно ответим на вопросы и расскажем всё о туре, а вы решите, стоит ли его бронировать. 
                    </p>
                </div>
                <div className="article_form_white_block">
                    <form className="application_form_panel">
                        <div className="application_form">
                            <div className="form_group">
                                <select name="" id="" className="how_to_chat">
                                    <option value="call">Позвоните мне</option>
                                    <option value="chat">Напишите мне</option>
                                </select>
                            </div>

                            <div className="form_group">
                                <label for="name">Как к вам обращаться? <span className="star">*</span></label>
                                <input id="name" name="name" placeholder="Имя" required />
                            </div>

                            <div className="form_group">
                                <label for="phone">Ваш номер телефона или ссылка на мессенджер <span className="star">*</span></label>
                                <input id="phone" name="phone" placeholder="Телефон или ссылка"
                                    type="text" />
                            </div>

                            <div className="form_group">
                                <label for="time">Когда вам будет комфортно обсудить поездку?</label>
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
                                <label for="notes">Примечания</label>
                                <textarea name="notes" id="notes">Хочу в этот тур! ССЫЛКА </textarea>
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

        </>
    );
}

export default ArticleForm;