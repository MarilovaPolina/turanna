import React from 'react';
import { useDispatch } from 'react-redux';
import { useParams } from 'react-router-dom';

import ArticleIntro from '../components/common/ArticleIntro/ArticleIntro';
import AboutVacationPackage from '../components/sections/ArticleVacationPackage/AboutVacationPackage/AboutVacationPackage';
import TourVariants from '../components/sections/ArticleVacationPackage/TourVariants/TourVariants';
import TravelTogether from '../components/sections/ArticleVacationPackage/TravelTogether/TravelTogether';
import PostsSection from '../components/common/PostsSection/PostsSection';
import ArticleForm from '../components/common/ArticleForm/ArticleForm';
import { getTourPackageById } from '../store/tourPackagesSlice';

function ArticleVacationPackage() {
  const { id } = useParams();
  const dispatch = useDispatch();
  const [tourPackageData, setTourPackageData] = React.useState(null);

  React.useEffect(() => {
    if (id) {
      dispatch(getTourPackageById(id))
        .unwrap()
        .then((data) => {
          setTourPackageData(data);
        })
        .catch((error) => {
          console.error('Ошибка при загрузке турподборки:', error);
        });
    }
  }, [id, dispatch]);

  if (!tourPackageData) return <>Загрузка...</>;
  return (
    <>
      <ArticleIntro tourPackageData={tourPackageData} />
      <div className="article_block">
        <div className="article container">
          <div className="white_block">
            <AboutVacationPackage tourPackageData={tourPackageData} tourPackageDescription={tourPackageData.description} />
            <TravelTogether />
            <TourVariants tourPackageData={tourPackageData} />
          </div>
          <ArticleForm />
        </div>
      </div>
      <PostsSection isFourPosts="true" />
    </>
  );
}

export default ArticleVacationPackage;

