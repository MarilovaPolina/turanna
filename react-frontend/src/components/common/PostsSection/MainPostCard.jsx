import React from 'react';
import moonImg from '../../../assets/img/moon.png'; 

function MainPostCard({ post }) {
  return (
    <div className="post_card main_card">
      <div className="main_card_image_wrapper">
        <img src={post.image} alt={post.title} loading="lazy" />
      </div>
      <div className="main_card_content">
        <p className="title_text">{post.title > 60 ? post.title.slice(0, 60) + "..." : post.title }</p>
        {post.type=="tour" && <p className="price blue_text">от {post.price} ₽</p>}
        <p className="short_description">
        {post.description > 230 ? post.description.slice(0, 230) + "..." : post.description }
        </p>
        {(post.type=="tour" || post.type=="variable") && 
            <>
            <p className="tour_start">Начало тура: {Array.isArray(post.date) ? post.date.join(' / ') : post.date}</p>
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
        }
        {post.type=="article" && <p className="tour_start">{post.publication_date}</p> }
        <a href="#" className="more_link blue_text">Узнать больше →</a>
      </div>
    </div>
  );
}

export default MainPostCard;