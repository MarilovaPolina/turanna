import React from 'react';
import bedIcon from '../../../../assets/img/icons/bed.png';

const TourVariantDetails = ({ index, variant, handleTourVariantChange }) => {
  return (
    <div className="tour_creation_details">
              <p className="substring">*Ненужные поля оставьте пустыми</p>
              <div className="details_inputs_wrapper">
                <div className="form_group">
                  <label htmlFor={`room_class_${index}`}>
                    <img src={bedIcon} alt="Кровать" />
                    Класс номера
                  </label>
                  <input
                    type="text"
                    className="admin_input"
                    name="room_class"
                    value={variant.room_class}
                    onChange={(e) => handleTourVariantChange(index, e)}
                    maxLength="35"
                  />
                </div>

                <div className="form_group">
                  <label htmlFor={`age_limit_${index}`}>
                    <img src={bedIcon} alt="Кровать" />
                    Возрастное ограничение
                  </label>
                  <input
                    type="text"
                    className="admin_input"
                    name="age_limit"
                    value={variant.age_limit}
                    onChange={(e) => handleTourVariantChange(index, e)}
                    maxLength="35"
                  />
                </div>

                <div className="form_group">
                  <label htmlFor={`all_inclusive_${index}`}>
                    <img src={bedIcon} alt="Кровать" />
                    Комплектация
                  </label>
                  <select
                    className="admin_input"
                    name="all_inclusive"
                    value={variant.all_inclusive}
                    onChange={(e) => handleTourVariantChange(index, e)}
                  >
                    <option value=""></option>
                    <option value="ultra_all_in">Ultra All Inclusive</option>
                    <option value="all_in">Все включено (AI)</option>
                    <option value="full_package">Турпакет (перелёт + отель + экскурсии)</option>
                    <option value="half_board">Завтрак + ужин (HB)</option>
                    <option value="breakfast">Только завтрак (BB)</option>
                    <option value="flgt_accmd">Перелёт + проживание</option>
                    <option value="accmd">Проживание без питания</option>
                    <option value="flgt_excursion">Перелёт + экскурсии</option>
                    <option value="excursion">Только экскурсии</option>
                    <option value="custom">Индивидуальный тур</option>
                  </select>
                </div>

                <div className="form_group">
                  <label htmlFor={`hotel_link_${index}`}>
                    <img src={bedIcon} alt="Кровать" />
                    Ссылка на отель
                  </label>
                  <input
                    type="text"
                    className="admin_input"
                    name="hotel_link"
                    value={variant.hotel_link}
                    onChange={(e) => handleTourVariantChange(index, e)}
                  />
                </div>

                <div className="form_group">
                  <label htmlFor={`distance_center_${index}`}>
                    <img src={bedIcon} alt="Кровать" />
                    Расст. до центра
                  </label>
                  <input
                    type="text"
                    className="admin_input"
                    name="distance_center"
                    value={variant.distance_center}
                    onChange={(e) => handleTourVariantChange(index, e)}
                    maxLength="35"
                  />
                </div>

                <div className="form_group">
                  <label htmlFor={`distance_airport_${index}`}>
                    <img src={bedIcon} alt="Кровать" />
                    Расст. до аэропорта
                  </label>
                  <input
                    type="text"
                    className="admin_input"
                    name="distance_airport"
                    value={variant.distance_airport}
                    onChange={(e) => handleTourVariantChange(index, e)}
                    maxLength="35"
                  />
                </div>

                <div className="form_group">
                  <label htmlFor={`distance_lift_${index}`}>
                    <img src={bedIcon} alt="Кровать" />
                    Расст. до подъемника
                  </label>
                  <input
                    type="text"
                    className="admin_input"
                    name="distance_lift"
                    value={variant.distance_lift}
                    onChange={(e) => handleTourVariantChange(index, e)}
                    maxLength="35"
                  />
                </div>

                <div className="form_group">
                  <label htmlFor={`distance_nature_${index}`}>
                    <img src={bedIcon} alt="Кровать" />
                    Расст. до природ объекта
                  </label>
                  <input
                    type="text"
                    className="admin_input"
                    name="distance_nature"
                    value={variant.distance_nature}
                    onChange={(e) => handleTourVariantChange(index, e)}
                    maxLength="35"
                  />
                </div>

                <div className="form_group">
                  <label htmlFor={`distance_beach_${index}`}>
                    <img src={bedIcon} alt="Кровать" />
                    Расст. до пляжа
                  </label>
                  <input
                    type="text"
                    className="admin_input"
                    name="distance_beach"
                    value={variant.distance_beach}
                    onChange={(e) => handleTourVariantChange(index, e)}
                    maxLength="35"
                  />
                </div>

                <div className="form_group">
                  <label htmlFor={`beach_type_${index}`}>
                    <img src={bedIcon} alt="Кровать" />
                    Тип пляжа
                  </label>
                  <select
                    className="admin_input"
                    name="beach_type"
                    value={variant.beach_type}
                    onChange={(e) => handleTourVariantChange(index, e)}
                  >
                    <option value=""></option>
                    <option value="песчаный">песчаный</option>
                    <option value="галечный">галечный</option>
                    <option value="коралловый">коралловый</option>
                    <option value="искусственный">искусственный</option>
                    <option value="дикий">дикий</option>
                  </select>
                </div>

                <div className="form_group">
                  <label htmlFor={`childcare_${index}`}>
                    <img src={bedIcon} alt="Кровать" />
                    Няня для детей
                  </label>
                  <select
                    className="admin_input"
                    name="childcare"
                    value={variant.childcare}
                    onChange={(e) => handleTourVariantChange(index, e)}
                  >
                    <option value=""></option>
                    <option value="no">нет</option>
                    <option value="yes">есть</option>
                    <option value="yes_paid">есть (платно)</option>
                    <option value="yes_free">есть (бесплатно)</option>
                  </select>
                </div>

                <div className="form_group">
                  <label htmlFor={`pool_${index}`}>
                    <img src={bedIcon} alt="Кровать" />
                    Бассейн отеля
                  </label>
                  <select
                    className="admin_input"
                    name="pool"
                    value={variant.pool}
                    onChange={(e) => handleTourVariantChange(index, e)}
                  >
                    <option value=""></option>
                    <option value="yes">есть</option>
                    <option value="no">нет</option>
                  </select>
                </div>

                <div className="form_group">
                  <label htmlFor={`gym_${index}`}>
                    <img src={bedIcon} alt="Кровать" />
                    Тренажерный зал отеля
                  </label>
                  <select
                    className="admin_input"
                    name="gym"
                    value={variant.gym}
                    onChange={(e) => handleTourVariantChange(index, e)}
                  >
                    <option value=""></option>
                    <option value="yes">есть</option>
                    <option value="no">нет</option>
                  </select>
                </div>

                <div className="form_group">
                  <label htmlFor={`pets_allowed_${index}`}>
                    <img src={bedIcon} alt="Кровать" />
                    Животные
                  </label>
                  <select
                    className="admin_input"
                    name="pets_allowed"
                    value={variant.pets_allowed}
                    onChange={(e) => handleTourVariantChange(index, e)}
                  >
                    <option value=""></option>
                    <option value="no">нельзя</option>
                    <option value="yes">можно</option>
                  </select>
                </div>

                <div className="form_group">
                  <label htmlFor={`airline_${index}`}>
                    <img src={bedIcon} alt="Кровать" />
                    Авиакомпания
                  </label>
                  <input
                    type="text"
                    className="admin_input"
                    name="airline"
                    value={variant.airline}
                    onChange={(e) => handleTourVariantChange(index, e)}
                    maxLength="35"
                  />
                </div>

                <div className="form_group">
                  <label htmlFor={`visa_required_${index}`}>
                    <img src={bedIcon} alt="Кровать" />
                    Виза
                  </label>
                  <select
                    className="admin_input"
                    name="visa_required"
                    value={variant.visa_required}
                    onChange={(e) => handleTourVariantChange(index, e)}
                  >
                    <option value=""></option>
                    <option value="yes">Нужна</option>
                    <option value="no">Не нужна</option>
                  </select>
                </div>
              </div>
            </div>
  );
};

export default TourVariantDetails;
