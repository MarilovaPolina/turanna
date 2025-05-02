import React from 'react';
import moonImg from '../../../assets/img/moon.png';
import airplaneSmallImg from '../../../assets/img/airplane_small.png';

export default function TourPostCard({ post, isMainCard = false }) {
  return (
    <div className={`post_card ${isMainCard ? 'main_card' : ''}`}>
      <div className={isMainCard ? 'main_card_image_wrapper' : 'card_image_wrapper'}>
        <img src={post.image} alt={post.title} loading="lazy" />
      </div>
      <div className={isMainCard ? 'main_card_content' : 'card_content'}>
        <p className={isMainCard ? 'title_text' : 'small_title_text'}>
            {post.title > 50 ? post.title.slice(0, 50) + "..." : post.title }
        </p>
        
        <div className="route">
          <img src={airplaneSmallImg} alt="Маршрут" loading="lazy" />
          <p>{post.route}</p>
        </div>
        
        <p className={isMainCard ? 'tour_nights' : 'tour_nights small_card_nights'}>
          {!isMainCard && <span className="tour_day">{post.date}</span>}
          <span className="panel">
            <img className="moon_img" src={moonImg} alt="Количество ночей" loading="lazy" />
            {post.nights}
          </span>
        </p>
        
        <p className="price blue_text">от {post.price} ₽</p>
        
        {isMainCard && (
          <a href="#" className="more_link blue_text">Узнать больше →</a>
        )}
      </div>
    </div>
  );
}