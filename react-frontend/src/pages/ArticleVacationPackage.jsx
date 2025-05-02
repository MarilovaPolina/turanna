import React from "react";

import ArticleIntro from "../components/common/ArticleIntro/ArticleIntro";
import AboutVacationPackage from "../components/sections/ArticleVacationPackage/AboutVacationPackage/AboutVacationPackage";
import TourVariants from "../components/sections/ArticleVacationPackage/TourVariants/TourVariants";
import TravelTogether from "../components/sections/ArticleVacationPackage/TravelTogether/TravelTogether";
import PostsSection from "../components/common/PostsSection/PostsSection";
import ArticleForm from "../components/common/ArticleForm/ArticleForm";

function ArticleVacationPackage(){
    return(
        <>
            <ArticleIntro />
            <div className="article_block">
                <div className="article container">
                    <div className="white_block">
                        <AboutVacationPackage />
                        <TravelTogether />
                        <TourVariants />
                    </div>
                    <ArticleForm />
                </div>
            </div>
            <PostsSection />
        </>
    );
}

export default ArticleVacationPackage;