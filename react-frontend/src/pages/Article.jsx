import React from "react";

import ArticleIntro from "../components/common/ArticleIntro/ArticleIntro";
import ArticleText from "../components/sections/Article/ArticleText/ArticleText";
import ArticleForm from "../components/common/ArticleForm/ArticleForm";
import PostsSection from "../components/common/PostsSection/PostsSection";

function ArticleVacationPackage(){
    return(
        <>
            <ArticleIntro />
            <div className="article_block">
                <div className="article container">
                    <div className="white_block">
                       <ArticleText />
                    </div>
                    <ArticleForm />
                </div>
            </div>
            <PostsSection />
        </>
    );
}

export default ArticleVacationPackage;