import React from 'react';
import axios from 'axios';
import dayjs from 'dayjs';
import 'dayjs/locale/de';
import { useLocation } from 'react-router-dom';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';

import blueAngleArrowIcon from '../assets/img/icons/blue_angle_arrow.png';
import searchIcon from '../assets/img/icons/search_gray.png';

import MainPostCard from '../components/common/PostsSection/MainPostCard';
import ArticlePostCard from '../components/common/PostsSection/ArticlePostCard';
import TourPostCard from '../components/common/PostsSection/TourPostCard';

const filterPostsByDates = (posts, startDate, endDate) => {
  const start = startDate ? new Date(startDate) : null;
  const end = endDate ? new Date(endDate) : null;

  return posts.filter((post) => {
    if (!post.tours || post.tours.length === 0) return false;

    const matchingTours = post.tours.filter((tour) => {
      const tourStart = new Date(tour.start_date);
      const tourEnd = new Date(tour.start_date);
      tourEnd.setDate(tourEnd.getDate() + tour.nights);

      const afterStart = !start || tourStart >= start;
      const beforeEnd = !end || tourEnd <= end;

      return afterStart && beforeEnd;
    });

    return matchingTours.length > 0;
  });
};

const AllPosts = () => {
  const [posts, setPosts] = React.useState([]);
  const [visiblePostsCount, setVisiblePostsCount] = React.useState(12);
  const [search, setSearch] = React.useState('');
  const [filters, setFilters] = React.useState({
    arrival_country: 'Все страны',
    date: 'new_posts',
    price: 'all_prices',
    startDate: '',
    endDate: '',
  });

  React.useEffect(() => {
    axios.get('http://localhost:8000/api/posts-content').then((res) => {
      setPosts(res.data);
    });
  }, []);

  const mainPost = React.useMemo(() => {
    const sorted = [...posts].sort((a, b) => new Date(b.created_at) - new Date(a.created_at));
    return sorted[0];
  }, [posts]);

  const hasFilters =
    search.trim() !== '' ||
    filters.arrival_country !== 'Все страны' ||
    filters.date !== 'new_posts' ||
    filters.price !== 'all_prices' ||
    filters.startDate !== '' ||
    filters.endDate !== '';

  const filteredPosts = React.useMemo(() => {
    let filtered = [...posts];

    if (search) {
      const searchLower = search.toLowerCase();
      filtered = filtered.filter((post) => {
        const titleMatch = post.title.toLowerCase().includes(searchLower);
        const depCityMatch = post.departure_city?.toLowerCase().includes(searchLower);
        const arrCityMatch = post.arrival_city?.toLowerCase().includes(searchLower);
        return titleMatch || depCityMatch || arrCityMatch;
      });
    }

    if (filters.arrival_country !== 'Все страны') {
      filtered = filtered.filter((post) =>
        post.tours?.some((t) => t.arrival_country === filters.arrival_country),
      );
    }

    if (filters.startDate || filters.endDate) {
      filtered = filterPostsByDates(filtered, filters.startDate, filters.endDate);
    }

    if (filters.price !== 'all_prices') {
      filtered = filtered.filter((post) => post.type !== 'article');
    }

    filtered.forEach((post) => {
      if (post.tours && post.tours.length > 0) {
        post.minPrice = Math.min(...post.tours.map((t) => Number(t.price)));
      } else {
        post.minPrice = null;
      }
    });

    filtered.sort((a, b) => {
      if (filters.price === 'cheap_prices' || filters.price === 'expensive_prices') {
        const priceA = a.minPrice ?? Infinity;
        const priceB = b.minPrice ?? Infinity;

        if (priceA !== priceB) {
          return filters.price === 'cheap_prices' ? priceA - priceB : priceB - priceA;
        }
      }

      const dateA = new Date(a.created_at);
      const dateB = new Date(b.created_at);

      return filters.date === 'old_posts' ? dateA - dateB : dateB - dateA;
    });

    return filtered;
  }, [posts, search, filters]);

  const filteredWithoutMain = hasFilters
    ? filteredPosts
    : filteredPosts.filter((p) => p.id !== mainPost?.id);

  const otherPosts = filteredWithoutMain.slice(0, visiblePostsCount);

  const loadMorePosts = () => {
    setVisiblePostsCount((prev) => prev + 12);
  };

  return (
    <div className="container">
      <div className="posts_heading">
        <p className="title_text">Cвежие туры и новости</p>
        <div className="posts_filter">
          <div className="posts_search_block">
            <div className="search">
              <img src={searchIcon} alt="Search" />
              <input
                type="text"
                name="search"
                placeholder="Поиск"
                value={search}
                onChange={(e) => setSearch(e.target.value)}
              />
            </div>
          </div>

          <div className="posts_filters_block">
            <select
              name="countries"
              value={filters.arrival_country}
              onChange={(e) => setFilters({ ...filters, arrival_country: e.target.value })}
            >
              <option value="Все страны">Все страны</option>
              {[
                ...new Set(
                  posts.flatMap((p) => p.tours?.map((t) => t.arrival_country)).filter(Boolean),
                ),
              ].map((country, idx) => (
                <option key={idx} value={country}>
                  {country}
                </option>
              ))}
            </select>

            <select
              name="date"
              value={filters.date}
              onChange={(e) => setFilters({ ...filters, date: e.target.value })}
            >
              <option value="new_posts">Свежие публикации</option>
              <option value="old_posts">Сначала старые</option>
            </select>

            <select
              name="price"
              value={filters.price}
              onChange={(e) => setFilters({ ...filters, price: e.target.value })}
            >
              <option value="all_prices">Любая цена</option>
              <option value="cheap_prices">Сначала дешевые</option>
              <option value="expensive_prices">Сначала дорогие</option>
            </select>
            
            <LocalizationProvider dateAdapter={AdapterDayjs} adapterLocale="de">
              <DatePicker 
                label="Начало тура после..."
                  type="date"
                  name="startDate"
                   value={filters.startDate ? dayjs(filters.startDate) : null}
                  className="calendar_input" 
                  onChange={(newValue) => {
                    setFilters({ ...filters, startDate: newValue ? newValue.format('YYYY-MM-DD') : '' });
                  }}
              />
            </LocalizationProvider>

            <LocalizationProvider dateAdapter={AdapterDayjs} adapterLocale="de">
              <DatePicker 
                label="Окончание тура до..."
                  type="date"
                  name="endDate"
                   value={filters.endDate ? dayjs(filters.endDate) : null}
                  className="calendar_input"
                  onChange={(newValue) => {
                    setFilters({ ...filters, endDate: newValue ? newValue.format('YYYY-MM-DD') : '' });
                  }}
              />
            </LocalizationProvider>
        
          </div>
        </div>
      </div>

      <div className="all_posts">
        <div className="posts_container">
          {!hasFilters && mainPost && <MainPostCard post={mainPost} />}

          {otherPosts.length > 0 ? (
            otherPosts.map((post) =>
              post.type === 'article' ? (
                <ArticlePostCard key={post.id} post={post} />
              ) : (
                <TourPostCard key={post.id} post={post} isMainCard={false} />
              ),
            )
          ) : (
            <p>Загрузка...</p>
          )}

          
        </div>
        {filteredWithoutMain.length > visiblePostsCount && (
            <div className="all_posts_load_more"  onClick={loadMorePosts} >
              <button className="more_posts load_more_btn">
                <span className="blue_text">Загрузить ещё</span>
                <img src={blueAngleArrowIcon} alt="Стрелка" loading="lazy" />
              </button>
            </div>
            
          )}
      </div>
    </div>
  );
};

export default AllPosts;
