import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";

import ArticleIntro from "../components/common/ArticleIntro/ArticleIntro";
import ArticleText from "../components/sections/Article/ArticleText/ArticleText";
import ArticleForm from "../components/common/ArticleForm/ArticleForm";
import PostsSection from "../components/common/PostsSection/PostsSection";

import { getArticleById } from "../store/articlesSlice";

function ArticleVacationPackage(){
    const { id } = useParams();
    const dispatch = useDispatch();
    const { article, loading } = useSelector((state) => state.article);

    React.useEffect(() => {
        dispatch(getArticleById(id));
    }, [id]);

  if (loading || !article) return <div>Загрузка...</div>;

    return(
        <>
            <ArticleIntro tourPackageData={article}/>
            <div className="article_block">
                <div className="article container">
                    <div className="white_block">
                       <ArticleText content={article.content}/>
                    </div>
                    <ArticleForm />
                </div>
            </div>
            <PostsSection isFourPosts="true"/>
        </>
    );
}

export default ArticleVacationPackage;