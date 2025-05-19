import React from 'react';
import { Link } from 'react-router-dom';

import moonImg from '../../../assets/img/moon.png';
import EditorContentPreview from '../TextEditor/EditorContentPreview';

export default function MainPostCard({ post }) {
  if (!post) return null;

  const {
    id='',
    title = '',
    main_image = '',
    description = '',
    created_at,
    type,
    tours = [],
    content,
    departure_city = '',
    arrival_city = '',
  } = post;

  const prices = tours.map((tour) => Number(tour.price));
  const minPrice = prices.length > 0 ? Math.min(...prices) : null;

  const publicationDate = created_at ? new Date(created_at).toLocaleDateString('ru-RU') : '';

  const tourDates =
    tours.length > 0
      ? tours.map((t) =>
          new Date(t.start_date).toLocaleDateString('ru-RU', {
            day: 'numeric',
            month: 'long',
          }),
        )
      : [];

  const tourNights = tours.length > 0 ? tours.map((t) => t.nights) : [];
  const uniqueSortedNights = [...new Set(tourNights)].sort((a, b) => a - b);

  return (
    <Link
      to={
        type === 'article'
          ? `/article/${id}`
          : type === 'tour_package'
          ? `/article_vacation_package/${id}`
          : '#'
      }
      className='main_card_link'
    >
      <div className="post_card main_card">
        <div className="main_card_image_wrapper">
          {main_image && (
            <img src={`http://localhost:8000${main_image}`} alt={title} loading="lazy" />
          )}
        </div>

        <div className="main_card_content">
          <p className="title_text">{title.length > 60 ? title.slice(0, 60) + '...' : title}</p>

          {type === 'tour_package' && (
            <>
              {minPrice && (
                <p className="price blue_text">от {minPrice.toLocaleString('ru-RU')} ₽</p>
              )}

              <div className="short_description">
                {description && <EditorContentPreview content={description} />}
              </div>

              <p className="tour_start">
                Начало тура: {tourDates.length > 0 ? tourDates.join(' / ') : ''}
              </p>

              <p className="tour_nights">
                Количество ночей:
                {(uniqueSortedNights.length > 0 ? uniqueSortedNights : [null]).map(
                  (night, index) => (
                    <span key={index} className="panel">
                      <img
                        className="moon_img"
                        src={moonImg}
                        alt="Количество ночей"
                        loading="lazy"
                      />
                      {night} ночей
                    </span>
                  ),
                )}
              </p>
            </>
          )}

          {type === 'article' && (
            <>
              <div className="article_short_description">
                <EditorContentPreview content={content} />
              </div>
              <p className="tour_start">{publicationDate}</p>
            </>
          )}

          {(type === 'tour' || type === 'variable') && !tours.length && (
            <>
              <p className="tour_start">
                {Array.isArray(post.date) ? post.date.join(' / ') : post.date}
              </p>
              <p className="tour_nights">
                Количество ночей:
                {(Array.isArray(post.nights) ? post.nights : [post.nights]).map((night, index) => (
                  <span key={index} className="panel">
                    <img className="moon_img" src={moonImg} alt="Количество ночей" loading="lazy" />
                    {night}
                  </span>
                ))}
              </p>
            </>
          )}

          <p href="#" className="more_link blue_text">
            Узнать больше →
          </p>
        </div>
      </div>
    </Link>
  );
}
