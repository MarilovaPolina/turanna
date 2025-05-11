import React from 'react';
import bedIcon from '../../../../assets/img/icons/bed.png';
import uploadImageIcon from "../../../../assets/img/icons/upload_image.png";

const AdminPanelCreateTourPackage = () => {
  return (
    <div className="admin_panel_content">
      <div className="creation_heading">
        <p className="small_title_text">Cоздать подборку</p>
        <p className="creation_heading_subtitle">
          Создайте туристическую подборку, включающую один или несколько вариантов путешествий. 
          Добавьте описание и загрузите фото в слайдер изображений, чтобы сделать подборку 
          привлекательной и полезной для клиентов.
        </p>
      </div>

      <div className="form_container">
        <form>
          <div className="form_group">
            <label htmlFor="package_name">Название подборки</label>
            <input
              type="text"
              className="admin_input error_input"
              placeholder="Напр. туристическое направление или название отеля (до 40 символов)"
              name="package_name"
              maxLength="40"
              required
            />
          </div>
          
          <div className="form_group">
            <label htmlFor="departure_city">Город отправления</label>
            <input
              type="text"
              className="admin_input error_input"
              placeholder="Город отправления"
              name="departure_city"
              required
            />
          </div>
          
          <div className="form_group">
            <label htmlFor="arrival_city">Город прибытия</label>
            <input
              type="text"
              className="admin_input error_input"
              placeholder="Город прибытия"
              name="arrival_city"
              required
            />
          </div>
          
          <div className="form_group">
            <label htmlFor="description">Описание</label>
            <input
              type="text"
              className="admin_input error_input"
              name="description"
              required
            />
          </div>

          <div className="upload_image_gallery">
            <label htmlFor="description">Галерея изображений</label>
            <div className="uploaded_images_wrapper">
              <div className="uploaded_image">
                <img src="assets/img/egypt.png" alt="Египет" />
              </div>
              
              <div className="input_file_wrapper">
                Нажмите, чтобы добавить фото
              </div>
            </div>
          </div>

          <div className="create_tour_variants_block">
            <p className="small_title_text">Варианты туров</p>
            
            <div className="tour_creation_wrapper">
              <form>
                <div className="tour_creation_description">
                  <div className="tour_creation_photo">
                    <label htmlFor="hotel_image">Фото отеля</label>
                    <div className="input_file_wrapper">
                      Нажмите, чтобы добавить фото
                    </div>
                  </div>

                  <div className="tour_creation_inputs">
                    <div className="form_group">
                      <label htmlFor="hotel_name">Название отеля</label>
                      <input
                        type="text"
                        className="admin_input error_input"
                        placeholder="Название отеля"
                        name="hotel_name"
                        required
                      />
                    </div>

                    <div className="divided_two_inputs">
                      <div className="form_group">
                        <label htmlFor="departure_city">Город отправления</label>
                        <input
                          type="text"
                          className="admin_input error_input"
                          placeholder="Город отправления"
                          name="departure_city"
                          required
                        />
                      </div>
                      <div className="form_group">
                        <label htmlFor="arrival_city">Город прибытия</label>
                        <input
                          type="text"
                          className="admin_input error_input"
                          placeholder="Город прибытия"
                          name="arrival_city"
                          required
                        />
                      </div>
                    </div>

                    <div className="about_tour">
                      <div className="form_group">
                        <label htmlFor="tour_start">Начало тура</label>
                        <input
                          type="date"
                          className="admin_input error_input"
                          name="tour_start"
                          required
                        />
                      </div>
                      <div className="form_group">
                        <label htmlFor="tour_finish">Посл. день тура</label>
                        <input
                          type="date"
                          className="admin_input error_input"
                          name="tour_finish"
                          required
                        />
                      </div>
                      <div className="form_group">
                        <label htmlFor="tour_nights">Количество ночей</label>
                        <input
                          type="number"
                          className="admin_input error_input"
                          name="tour_nights"
                          required
                        />
                      </div>
                    </div>

                    <div className="divided_two_inputs">
                      <div className="form_group">
                        <label htmlFor="tour_price">Цена</label>
                        <input
                          type="number"
                          className="admin_input error_input"
                          name="tour_price"
                          required
                        />
                      </div>
                      <div className="radio_btns_wrapper">
                        <div className="radio_wrapper">
                          <input id="per_person" type="radio" name="question" defaultChecked />
                          <label htmlFor="per_person">цена за одного</label>
                        </div>
                        <div className="radio_wrapper">
                          <input id="per_couple" type="radio" name="question" />
                          <label htmlFor="per_couple">цена за двоих</label>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>

                <div className="tour_creation_details">
                  <p className="substring">*Ненужные поля оставьте пустыми</p>
                  <div className="details_inputs_wrapper">
                    <div className="form_group">
                      <label htmlFor="room_comfort">
                        <img src={bedIcon} alt="Кровать" />
                        Класс номера
                      </label>
                      <input
                        type="text"
                        className="admin_input"
                        name="room_comfort"
                        maxLength="35"
                      />
                    </div>
                    
                    <div className="form_group">
                      <label htmlFor="age_limit">
                        <img src={bedIcon} alt="Кровать" />
                        Возрастное ограничение
                      </label>
                      <input
                        type="text"
                        className="admin_input"
                        name="age_limit"
                        maxLength="35"
                      />
                    </div>
                    
                    <div className="form_group">
                      <label htmlFor="all_inclusive">
                        <img src={bedIcon} alt="Кровать" />
                        Все включено
                      </label>
                      <select className="admin_input" name="all_inclusive">
                        <option value=""></option>
                        <option value="есть">есть</option>
                        <option value="нет">нет</option>
                      </select>
                    </div>
                    
                    <div className="form_group">
                      <label htmlFor="hotel_link">
                        <img src={bedIcon} alt="Кровать" />
                        Ссылка на отель
                      </label>
                      <input
                        type="text"
                        className="admin_input"
                        name="hotel_link"
                      />
                    </div>
                    
                    <div className="form_group">
                      <label htmlFor="distance_to_center">
                        <img src={bedIcon} alt="Кровать" />
                        Расст. до центра
                      </label>
                      <input
                        type="text"
                        className="admin_input"
                        name="distance_to_center"
                        maxLength="35"
                      />
                    </div>
                    
                    <div className="form_group">
                      <label htmlFor="distance_to_airport">
                        <img src={bedIcon} alt="Кровать" />
                        Расст. до аэропорта
                      </label>
                      <input
                        type="text"
                        className="admin_input"
                        name="distance_to_airport"
                        maxLength="35"
                      />
                    </div>
                    
                    <div className="form_group">
                      <label htmlFor="distance_to_lift">
                        <img src={bedIcon} alt="Кровать" />
                        Расст. до подъемника
                      </label>
                      <input
                        type="text"
                        className="admin_input"
                        name="distance_to_lift"
                        maxLength="35"
                      />
                    </div>
                    
                    <div className="form_group">
                      <label htmlFor="distance_to_nature">
                        <img src={bedIcon} alt="Кровать" />
                        Расст. до природ объекта
                      </label>
                      <input
                        type="text"
                        className="admin_input"
                        name="distance_to_nature"
                        maxLength="35"
                      />
                    </div>
                    
                    <div className="form_group">
                      <label htmlFor="distance_to_beach">
                        <img src={bedIcon} alt="Кровать" />
                        Расст. до пляжа
                      </label>
                      <input
                        type="text"
                        className="admin_input"
                        name="distance_to_beach"
                        maxLength="35"
                      />
                    </div>
                    
                    <div className="form_group">
                      <label htmlFor="beach_type">
                        <img src={bedIcon} alt="Кровать" />
                        Тип пляжа
                      </label>
                      <select className="admin_input" name="beach_type">
                        <option value=""></option>
                        <option value="песчаный">песчаный</option>
                        <option value="галечный">галечный</option>
                        <option value="коралловый">коралловый</option>
                        <option value="искусственный">искусственный</option>
                        <option value="дикий">дикий</option>
                      </select>
                    </div>
                    
                    <div className="form_group">
                      <label htmlFor="child_care">
                        <img src={bedIcon} alt="Кровать" />
                        Няня для детей
                      </label>
                      <select className="admin_input" name="child_care">
                        <option value=""></option>
                        <option value="нет">нет</option>
                        <option value="есть">есть</option>
                        <option value="есть (платно)">есть (платно)</option>
                        <option value="есть (бесплатно)">есть (бесплатно)</option>
                      </select>
                    </div>
                    
                    <div className="form_group">
                      <label htmlFor="hotel_pool">
                        <img src={bedIcon} alt="Кровать" />
                        Бассейн отеля
                      </label>
                      <select className="admin_input" name="hotel_pool">
                        <option value=""></option>
                        <option value="есть">есть</option>
                        <option value="нет">нет</option>
                      </select>
                    </div>
                    
                    <div className="form_group">
                      <label htmlFor="hotel_gym">
                        <img src={bedIcon} alt="Кровать" />
                        Тренажерный зал отеля
                      </label>
                      <select className="admin_input" name="hotel_gym">
                        <option value=""></option>
                        <option value="есть">есть</option>
                        <option value="нет">нет</option>
                      </select>
                    </div>
                    
                    <div className="form_group">
                      <label htmlFor="animals">
                        <img src={bedIcon} alt="Кровать" />
                        Животные
                      </label>
                      <select className="admin_input" name="animals">
                        <option value=""></option>
                        <option value="нельзя">нельзя</option>
                        <option value="можно">можно</option>
                      </select>
                    </div>
                    
                    <div className="form_group">
                      <label htmlFor="airline">
                        <img src={bedIcon} alt="Кровать" />
                        Авиакомпания
                      </label>
                      <input
                        type="text"
                        className="admin_input"
                        name="airline"
                        maxLength="35"
                      />
                    </div>
                    
                    <div className="form_group">
                      <label htmlFor="visa">
                        <img src={bedIcon} alt="Кровать" />
                        Виза
                      </label>
                      <select className="admin_input" name="visa">
                        <option value=""></option>
                        <option value="Нужна">Нужна</option>
                        <option value="Не нужна">Не нужна</option>
                      </select>
                    </div>
                  </div>
                </div>
              </form>
            </div>

            <div className="create_tour_variant_btn">
              <div className="input_file_wrapper">
                + Нажмите, чтобы добавить вариант тура
              </div>
            </div>
          </div>

          <button className="blue_btn">Сохранить</button>
        </form>
      </div>
    </div>
  );
};

export default AdminPanelCreateTourPackage;