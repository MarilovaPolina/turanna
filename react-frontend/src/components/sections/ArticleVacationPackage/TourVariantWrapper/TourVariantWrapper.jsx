import React from "react";
import { useOutletContext } from "react-router-dom";

import calendarIcon from '../../../../assets/img/icons/calendar.png';
import moonSmallIcon from '../../../../assets/img/icons/moon_small.png';
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
import birthdayIcon from '../../../../assets/img/icons/birthday.png';
import hotelIcon from '../../../../assets/img/icons/hotel.png';
import plateIcon from '../../../../assets/img/icons/plate.png';
import cityIcon from '../../../../assets/img/icons/city.png';
import whiteAngleArrowIcon from '../../../../assets/img/icons/white_angle_arrow.png';

function formatDate(dateStr) {
  const options = { day: "numeric", month: "long", year: "numeric" };
  const date = new Date(dateStr);
  return date.toLocaleDateString("ru-RU", options);
}

const translations = {
  all_inclusive: {
    ultra_all_in: 'Ультра AI (UAI)',
    all_in: 'Все включено (AI)',
    full_package: 'Турпакет (перелёт + отель + экскурсии)',
    half_board: 'Завтрак + ужин (HB)',
    breakfast: 'Только завтрак (BB)',
    flgt_accmd: 'Перелёт + проживание',
    accmd: 'Проживание без питания',
    flgt_excursion: 'Перелёт + экскурсии',
    excursion: 'Только экскурсии',
    custom: 'Индивидуальный тур',
    '': '',
  },
  pets_allowed: {
    yes: 'Можно',
    no: 'Нельзя',
    '': '',
  },
  childcare: {
    no: 'Нет',
    yes_paid: 'Есть (платно)',
    yes_free: 'Есть (бесплатно)',
    yes: 'Есть',
    '': '',
  },
  pool: {
    yes: 'Есть',
    no: 'Нет',
    '': '',
  },
  gym: {
    yes: 'Есть',
    no: 'Нет',
    '': '',
  },
  visa_required: {
    yes: 'Нужна',
    no: 'Не нужна',
    '': '',
  },
  beach_type: {
    песчаный: 'Песчаный',
    галечный: 'Галечный',
    коралловый: 'Коралловый',
    искусственный: 'Искусственный',
    дикий: 'Дикий',
    '': '',
  },
};

const getTranslatedValue = (field, value) => {
  if (!value) return '';
  return translations[field]?.[value] || value;
};

function TourVariantWrapper({ tour }) {
  const { onOpenPopup } = useOutletContext();

  const route = `${tour.departure_city} ⭢ ${tour.arrival_city}`;

  const nights = tour.nights || Math.round(
    (new Date(tour.end_date) - new Date(tour.start_date)) / (1000 * 60 * 60 * 24)
  );

  const details = tour.details || {};

   const detailMap = {
    room_class: { icon: bedIcon, label: 'Класс номера' },
    age_limit: { icon: birthdayIcon, label: 'Возр. ограничение' },
    all_inclusive: { icon: plateIcon, label: 'Комплектация' },
    distance_center: { icon: cityIcon, label: 'Расст. до центра' },
    distance_airport: { icon: airplaneArrivingIcon, label: 'Расст. до аэропорта' },
    distance_lift: { icon: cablewayIcon, label: 'Расст. до подъемника' },
    distance_nature: { icon: nationalParkIcon, label: 'До достопримечательности' },
    distance_beach: { icon: oceanIcon, label: 'Расст. до пляжа' },
    beach_type: { icon: beachIcon, label: 'Тип пляжа' },
    childcare: { icon: babyIcon, label: 'Няня для детей' },
    pool: { icon: swimmerIcon, label: 'Бассейн отеля' },
    gym: { icon: gymIcon, label: 'Тренажерный зал' },
    pets_allowed: { icon: dogIcon, label: 'Животные' },
    airline: { icon: airplaneIcon, label: 'Авиакомпания' },
    visa_required: { icon: notebookIcon, label: 'Виза' },
  };
  const hasValue = (val) => val !== null && val !== undefined && val !== '';

  const price = tour.price ? `${parseFloat(tour.price).toLocaleString("ru-RU")} ₽` : "—";
console.log(tour.hotel_link)
  return (
    <div className="variant_wrapper">
      <div className="variant_image">
        <img src={`http://localhost:8000${tour.hotel_image}`} alt={tour.hotel_name} loading="lazy" />
      </div>

      <div className="variant_info_card">
        <div className="variant_heading_block">
          <p className="small_title_text">{tour.hotel_name}</p>
          <p className="article_number">{tour.article_number}</p>
        </div>

        <div className="variant_card_route">
          <p>{route}</p>
        </div>

        <div className="variant_info_card_content">
          <div className="about_tour">
            <div className="details_block">
              <div className="details_block_image_part">
                <img src={calendarIcon} alt="Начало тура" />
              </div>
              <div className="details_text_part">
                <p className="substring">Начало тура</p>
                <p className="details_content">{formatDate(tour.start_date)}</p>
              </div>
            </div>

            <div className="details_block">
              <div className="details_block_image_part">
                <img src={calendarIcon} alt="Последний день" />
              </div>
              <div className="details_text_part">
                <p className="substring">Посл. день</p>
                <p className="details_content">{formatDate(tour.end_date)}</p>
              </div>
            </div>

            <div className="details_block">
              <div className="details_block_image_part">
                <img src={moonSmallIcon} alt="Количество ночей" />
              </div>
              <div className="details_text_part">
                <p className="substring">Количество ночей</p>
                <p className="details_content">{nights} {nights === 1 ? "ночь" : (nights >= 2 && nights <= 4 ? "ночи" : "ночей")}</p>
              </div>
            </div>
          </div>

          <div className="about_accommodation">
            <div className="details_block">
              <div className="details_block_image_part">
                <img src={hotelIcon} alt="Название отеля" />
              </div>
              <div className="details_text_part">
                <p className="substring">Название отеля</p>
                {tour.details.hotel_link ? 
                    (
                    <a href={tour.details.hotel_link} className="details_content hotel_link">{tour.hotel_name}</a>) 
                    : (<p className="details_content">{tour.hotel_name}</p>)
                }
                
              </div>
            </div>

             {Object.entries(detailMap).map(([key, { icon, label }]) => {
                    if (!hasValue(details[key])) return null;

                    return (
                    <div key={key} className="details_block">
                        <div className="details_block_image_part">
                        <img src={icon} alt={label} />
                        </div>
                        <div className="details_text_part">
                        <p className="substring">{label}</p>
                        <p className="details_content">{getTranslatedValue(key, details[key])}</p>
                        </div>
                    </div>
                    );
            })}
          </div>

          <div className="price_block">
            <div className="price_part">
              <p className="small_title_text">от {price}</p>
              <p className="substring">цена за двоих</p>
            </div>
            <div className="know_more">
              <button className="blue_btn" onClick={() => onOpenPopup('call')}>
                <p>Узнать больше</p>
                <img src={whiteAngleArrowIcon} alt="Стрелка" />
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default TourVariantWrapper;
