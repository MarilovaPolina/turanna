import React from 'react';
import bedIcon from '../../../../assets/img/icons/bed.png';
import nationalParkIcon from '../../../../assets/img/icons/national_park.png';
import beachIcon from '../../../../assets/img/icons/beach_with_umbrella.png';
import oceanIcon from '../../../../assets/img/icons/ocean.png';
import babyIcon from '../../../../assets/img/icons/baby.png';
import swimmerIcon from '../../../../assets/img/icons/swimmer.png';
import gymIcon from '../../../../assets/img/icons/athletic_shoe.png';
import dogIcon from '../../../../assets/img/icons/dog.png';
import notebookIcon from '../../../../assets/img/icons/notebook.png';
import airplaneArrivingIcon from '../../../../assets/img/icons/airplane_arriving.png';
import airplaneIcon from '../../../../assets/img/icons/airplane_emj.png';
import cablewayIcon from '../../../../assets/img/icons/mountain_cableway.png';
import calendarIcon from '../../../../assets/img/icons/calendar.png';
import birthdayIcon from '../../../../assets/img/icons/birthday.png';
import hotelIcon from '../../../../assets/img/icons/hotel.png';
import moonSmallIcon from '../../../../assets/img/icons/moon_small.png';
import plateIcon from '../../../../assets/img/icons/plate.png';
import cityIcon from '../../../../assets/img/icons/city.png';

const TourVariantDetails = ({ index, variant, handleTourVariantChange }) => {
  return (
    <div className="tour_creation_details">
      <p className="substring">*Ненужные поля оставьте пустыми</p>
      <div className="details_inputs_wrapper">
        <div className="form_group">
          <label htmlFor={`room_class_${index}`}>
            <img src={bedIcon} />
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
            <img src={birthdayIcon} />
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
            <img src={plateIcon} />
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
            <img src={hotelIcon} />
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
            <img src={cityIcon} />
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
            <img src={airplaneArrivingIcon} />
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
            <img src={cablewayIcon} />
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
            <img src={nationalParkIcon} />
            Расст. до достопримечатльности
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
            <img src={oceanIcon} />
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
            <img src={beachIcon} />
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
            <img src={babyIcon} />
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
            <img src={swimmerIcon} />
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
            <img src={gymIcon} />
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
            <img src={dogIcon} />
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
            <img src={airplaneIcon} />
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
            <img src={notebookIcon} />
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
