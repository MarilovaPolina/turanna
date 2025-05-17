import React from 'react';
import { useLocation } from 'react-router-dom';
import { Link } from 'react-router-dom';
import axios from 'axios';

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
  const [posts, setPosts] = React.useState([]);

  React.useEffect(() => {
    const checkScreenSize = () => setIsMobile(window.innerWidth < 570);
    checkScreenSize();
    window.addEventListener('resize', checkScreenSize);
    return () => window.removeEventListener('resize', checkScreenSize);
  }, []);
    
  React.useEffect(() => {
    axios.get('http://localhost:8000/api/posts-content')
      .then(res => setPosts(res.data))
  }, [])


  //const sortedPosts = [...posts].sort((a, b) => b.id - a.id);
  const showMainCard = isHomePage && !isMobile;
  const cardCount = isMobile ? 4 : 5;

  const displayedPosts = posts.length === 0
    ? []
    : showMainCard
      ? [posts[0], ...posts.slice(1, cardCount)]
      : posts.slice(0, cardCount);
 
console.log(posts)


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
          {displayedPosts ? displayedPosts.map((post, index) => {
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
          }) : <p>Здесь пока нет контента...</p>}
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