import React from 'react';
import { Link } from 'react-router-dom';

import moonImg from '../../../assets/img/moon.png';
import airplaneSmallImg from '../../../assets/img/airplane_small.png';

export default function TourPostCard({ post, isMainCard = false }) {
  if (!post) return null;

  const { id='', title = '', main_image = '', departure_city = '', arrival_city = '', tours = [] } = post;

  const minPrice = tours.length > 0 ? Math.min(...tours.map((t) => Number(t.price))) : null;

  const formattedMinPrice = minPrice !== null ? minPrice.toLocaleString('ru-RU') : null;
  const toursToShow = tours.slice(0, 2);
  const extraToursCount = tours.length > 2 ? tours.length - 2 : 0;

  return (
    <Link to={`/article_vacation_package/${id}`}>
      <div className={`post_card ${isMainCard ? 'main_card' : ''}`}>
        <div className={isMainCard ? 'main_card_image_wrapper' : 'card_image_wrapper'}>
          <img src={`http://localhost:8000${main_image}`} alt={title} loading="lazy" />
        </div>

        <div className={isMainCard ? 'main_card_content' : 'card_content'}>
          <p className={isMainCard ? 'title_text' : 'small_title_text'}>
            {title.length > 50 ? title.slice(0, 50) + '...' : title}
          </p>

          <div className="route">
            <img src={airplaneSmallImg} alt="Маршрут" loading="lazy" />
            <p>
              {departure_city} → {arrival_city}
            </p>
          </div>

          {tours.length > 1 ? (
            <div className="tour_variants_card">
              {toursToShow.map((tour) => (
                <div key={tour.id} className="tour_variant">
                  <p className="variant_date">
                    {new Date(tour.start_date).toLocaleDateString('ru-RU')}
                  </p>
                  <p className="variant_nights">
                    <img className="moon_img" src={moonImg} alt="Ночи" loading="lazy" />
                    {tour.nights} ночей
                  </p>
                  <p className="variant_price">от {Number(tour.price).toLocaleString('ru-RU')} ₽</p>
                </div>
              ))}

              {extraToursCount > 0 && (
                <p className="more_variants">
                  +{extraToursCount} вариант
                  {extraToursCount > 1 ? 'а' : extraToursCount > 4 ? 'ов' : ''}
                </p>
              )}
            </div>
          ) : (
            tours.length === 1 && (
              <p className={isMainCard ? 'tour_nights' : 'tour_nights small_card_nights'}>
                <span className="tour_day">
                  {new Date(tours[0].start_date).toLocaleDateString('ru-RU', {
                    day: 'numeric',
                    month: 'long',
                    year: 'numeric',
                  })}
                </span>
                <span className="panel">
                  <img className="moon_img" src={moonImg} alt="Количество ночей" loading="lazy" />
                  {tours[0].nights} ночей
                </span>
              </p>
            )
          )}

          {formattedMinPrice && <p className="price blue_text">от {formattedMinPrice} ₽</p>}

          {isMainCard && (
            <a href="#" className="more_link blue_text">
              Узнать больше →
            </a>
          )}
        </div>
      </div>
    </Link>
  );
}
