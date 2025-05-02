import React from 'react';
import moonImg from '../../../assets/img/moon.png';
import airplaneSmallImg from '../../../assets/img/airplane_small.png';

function VariablePostCard({ post, isMainCard = false }) {
  return (
    <div className={`post_card ${isMainCard ? 'main_card' : ''}`}>
      <div className={isMainCard ? 'main_card_image_wrapper' : 'card_image_wrapper'}>
        <img src={post.image} alt={post.title} loading="lazy" />
      </div>
      
      <div className={isMainCard ? 'main_card_content' : 'card_content'}>
        {isMainCard ? (
          <>
            <p className="title_text">{post.title}</p>
            <p className="price blue_text">от {post.price} ₽</p>
            <p className="short_description">{post.description}</p>
            <p className="tour_start">Начало тура: {post.date.join(' / ')}</p>
            <p className="tour_nights">
              Количество ночей:
              {post.nights.map(night => (
                <span key={night} className="panel">
                  <img className="moon_img" src={moonImg} loading="lazy" /> 
                  {night} ночей
                </span>
              ))}
            </p>
            <a href="#" className="more_link blue_text">Узнать больше →</a>
          </>
        ) : (
          <>
            <div className="variable_card_type_title">
              <p className="small_title_text">{post.title}</p>
              <div className="route">
                <img src={airplaneSmallImg} alt="Маршрут" loading="lazy" />
                <p>{post.route}</p>
              </div>
            </div>

            <div className="tour_variants_card">
              {post.variants.slice(0, 2).map((variant, index) => (
                <div key={index} className="tour_variant">
                  <p className="variant_date">{variant.date}</p>
                  <p className="variant_nights">
                    <img className="moon_img" src={moonImg} loading="lazy" />
                    {variant.nights}
                  </p>
                  <p className="variant_price">от {variant.price}</p>
                </div>
              ))}
              
              {post.variants.length > 2 && (
                <a href="#" className="more_variants">
                  +{post.variants.length - 2} варианта
                </a>
              )}
            </div>

            <p className="price blue_text">от {post.price} ₽</p>
          </>
        )}
      </div>
    </div>
  );
}

export default VariablePostCard;