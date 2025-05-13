import React from 'react';
import bedIcon from '../../../../assets/img/icons/bed.png';

const TourVariantDetailsSection = ({ index, variant, handleTourVariantChange }) => {
  return (
    <div className="tour_creation_details">
      <p className="substring">*Ненужные поля оставьте пустыми</p>
      <div className="details_inputs_wrapper">
        <div className="form_group">
          <label htmlFor={`room_comfort_${index}`}>
            <img src={bedIcon} alt="Кровать" />
            Класс номера
          </label>
          <input
            type="text"
            className="admin_input"
            name="room_comfort"
            value={variant.room_comfort}
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
            Все включено
          </label>
          <select
            className="admin_input"
            name="all_inclusive"
            value={variant.all_inclusive}
            onChange={(e) => handleTourVariantChange(index, e)}
          >
            <option value=""></option>
            <option value="есть">есть</option>
            <option value="нет">нет</option>
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
          <label htmlFor={`distance_to_center_${index}`}>
            <img src={bedIcon} alt="Кровать" />
            Расст. до центра
          </label>
          <input
            type="text"
            className="admin_input"
            name="distance_to_center"
            value={variant.distance_to_center}
            onChange={(e) => handleTourVariantChange(index, e)}
            maxLength="35"
          />
        </div>

        <div className="form_group">
          <label htmlFor={`distance_to_airport_${index}`}>
            <img src={bedIcon} alt="Кровать" />
            Расст. до аэропорта
          </label>
          <input
            type="text"
            className="admin_input"
            name="distance_to_airport"
            value={variant.distance_to_airport}
            onChange={(e) => handleTourVariantChange(index, e)}
            maxLength="35"
          />
        </div>

        <div className="form_group">
          <label htmlFor={`distance_to_lift_${index}`}>
            <img src={bedIcon} alt="Кровать" />
            Расст. до подъемника
          </label>
          <input
            type="text"
            className="admin_input"
            name="distance_to_lift"
            value={variant.distance_to_lift}
            onChange={(e) => handleTourVariantChange(index, e)}
            maxLength="35"
          />
        </div>

        <div className="form_group">
          <label htmlFor={`distance_to_nature_${index}`}>
            <img src={bedIcon} alt="Кровать" />
            Расст. до природ объекта
          </label>
          <input
            type="text"
            className="admin_input"
            name="distance_to_nature"
            value={variant.distance_to_nature}
            onChange={(e) => handleTourVariantChange(index, e)}
            maxLength="35"
          />
        </div>

        <div className="form_group">
          <label htmlFor={`distance_to_beach_${index}`}>
            <img src={bedIcon} alt="Кровать" />
            Расст. до пляжа
          </label>
          <input
            type="text"
            className="admin_input"
            name="distance_to_beach"
            value={variant.distance_to_beach}
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
          <label htmlFor={`child_care_${index}`}>
            <img src={bedIcon} alt="Кровать" />
            Няня для детей
          </label>
          <select
            className="admin_input"
            name="child_care"
            value={variant.child_care}
            onChange={(e) => handleTourVariantChange(index, e)}
          >
            <option value=""></option>
            <option value="нет">нет</option>
            <option value="есть">есть</option>
            <option value="есть (платно)">есть (платно)</option>
            <option value="есть (бесплатно)">есть (бесплатно)</option>
          </select>
        </div>

        <div className="form_group">
          <label htmlFor={`hotel_pool_${index}`}>
            <img src={bedIcon} alt="Кровать" />
            Бассейн отеля
          </label>
          <select
            className="admin_input"
            name="hotel_pool"
            value={variant.hotel_pool}
            onChange={(e) => handleTourVariantChange(index, e)}
          >
            <option value=""></option>
            <option value="есть">есть</option>
            <option value="нет">нет</option>
          </select>
        </div>

        <div className="form_group">
          <label htmlFor={`hotel_gym_${index}`}>
            <img src={bedIcon} alt="Кровать" />
            Тренажерный зал отеля
          </label>
          <select
            className="admin_input"
            name="hotel_gym"
            value={variant.hotel_gym}
            onChange={(e) => handleTourVariantChange(index, e)}
          >
            <option value=""></option>
            <option value="есть">есть</option>
            <option value="нет">нет</option>
          </select>
        </div>

        <div className="form_group">
          <label htmlFor={`animals_${index}`}>
            <img src={bedIcon} alt="Кровать" />
            Животные
          </label>
          <select
            className="admin_input"
            name="animals"
            value={variant.animals}
            onChange={(e) => handleTourVariantChange(index, e)}
          >
            <option value=""></option>
            <option value="нельзя">нельзя</option>
            <option value="можно">можно</option>
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
          <label htmlFor={`visa_${index}`}>
            <img src={bedIcon} alt="Кровать" />
            Виза
          </label>
          <select
            className="admin_input"
            name="visa"
            value={variant.visa}
            onChange={(e) => handleTourVariantChange(index, e)}
          >
            <option value=""></option>
            <option value="Нужна">Нужна</option>
            <option value="Не нужна">Не нужна</option>
          </select>
        </div>
      </div>
    </div>
  );
};

export default TourVariantDetailsSection;
