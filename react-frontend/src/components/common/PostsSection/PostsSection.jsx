import React from 'react';
import { useLocation } from 'react-router-dom';

import MainPostCard from './MainPostCard';
import TourPostCard from './TourPostCard';
import ArticlePostCard from './ArticlePostCard';
import VariablePostCard from './VariablePostCard';

import blueAngleArrowIcon from '../../../assets/img/icons/blue_angle_arrow.png';
import mountainImg from '../../../assets/img/mountain.png';

function PostsSection() {
  const location = useLocation();
  const isHomePage = location.pathname === '/';
  const [isMobile, setIsMobile] = React.useState(false);

  React.useEffect(() => {
    const checkScreenSize = () => setIsMobile(window.innerWidth < 570);
    checkScreenSize();
    window.addEventListener('resize', checkScreenSize);
    return () => window.removeEventListener('resize', checkScreenSize);
  }, []);

  const posts = [
    {
      id: 1,
      title: 'Египет',
      price: '258 200',
      image: mountainImg,
      description: 'Подборка для 2-х взрослых с вылетом из Казани, все включено!',
      dates: '30 окт / 20 нояб / 30 дек',
      nights: '9 ночей',
      route: 'Казань → Хургада',
      date: '30 октября',
      type: 'tour',
    },
    {
      id: 2,
      title: 'Шри-Ланка',
      price: '258 200',
      image: mountainImg,
      route: 'Казань → Хамбантота',
      date: '18 января',
      nights: '9 ночей',
      type: 'tour',
    },
    {
      id: 3,
      title: 'Турция',
      price: '187 500',
      image: mountainImg,
      route: 'Казань → Анталия',
      date: '15 февраля',
      nights: '7 ночей',
      type: 'tour',
    },
   
    {
      id: 5,
      title: 'Почему стоит бронировать туры заранее?',
      publication_date: '30.10.2024',
      image: mountainImg,
      description: 'Подборка для 2-х взрослых с вылетом из Казани, все включено! Отели, которые регулярно выбирают наши туристы. Отели, которые регулярно выбирают наши туристы. Для бронирования оставьте ...',
      type: 'article',
    },
    /*
    {
      id: 6,
      title: 'ОАЭ',
      price: '324 800',
      image: mountainImg,
      route: 'Казань → Дубай',
      description: "Подборка для 2-х взрослых с вылетом из Казани, все включено! Отели, которые регулярно выбирают наши туристы. Отели, которые регулярно выбирают наши туристы. Для бронирования оставьте ...",
      date: '10 марта',
      nights: '8 ночей',
      type: 'tour',
    },
    
    {
      id: 8,
      type: 'variable',
      title: 'Египет',
      price: '258 200 ₽',
      image: mountainImg,
      description: 'Подборка для 2-х взрослых с вылетом из Казани...',
      date: ['30 окт', '20 нояб', '30 дек'],
      nights: ['9 ночей', '7 ночей', '8 ночей'],
      route: 'Казань → Шарм-эль-Шейх',
      variants: [
        { date: '30.10.2024', nights: '9 ночей', price: '258 тыс. ₽' },
        { date: '20.11.2024', nights: '7 ночей', price: '245 тыс. ₽' },
        { date: '20.11.2024', nights: '7 ночей', price: '245 тыс. ₽' },
        { date: '20.11.2024', nights: '7 ночей', price: '245 тыс. ₽' },
      ]
    },*/
    
  ];

  const sortedPosts = [...posts].sort((a, b) => b.id - a.id);
  const showMainCard = isHomePage && !isMobile;
  const cardCount = isMobile ? 4 : 5;

  const displayedPosts = showMainCard
    ? [sortedPosts[0], ...sortedPosts.slice(1, cardCount)]
    : sortedPosts.slice(0, cardCount);

  return (
    <div className="posts_block">
      <div className="container">
        <div className="title">
          <p className="title_text">Свежие туры и новости</p>
          <a href="#">
            <img className="arrow_title" src={blueAngleArrowIcon} alt="Стрелка" loading="lazy" />
          </a>
        </div>
        
        <div className="posts">
          <div className="posts_container">
          {displayedPosts.map((post, index) => {
            if (showMainCard && index === 0) {
              return <MainPostCard key={post.id} post={post} />;
            }
            
            return post.type === 'variable' ? (
              <VariablePostCard key={post.id} post={post} />
            ) : post.type === 'article' ? (
              <ArticlePostCard key={post.id} post={post} />
            ) : (
              <TourPostCard key={post.id} post={post} isMainCard={false} />
            );
          })}
          </div>
          
          <a href="#" className="more_posts">
            <span className="blue_text">Показать больше</span>
            <img src={blueAngleArrowIcon} alt="Стрелка" loading="lazy" />
          </a>
        </div>
      </div>
    </div>
  );
}

export default PostsSection;