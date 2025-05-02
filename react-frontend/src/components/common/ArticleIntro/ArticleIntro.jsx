import React from "react";
import egyptImage from '../../../assets/img/egypt.png';

function ArticleIntro(){
    return(
        <>
            <div className="article_intro">
                <div className="container">
                    <p className="large_text">
                        египет
                    </p>
                    <div 
                        className="article_intro_image" 
                        style={{backgroundImage: `url(${egyptImage})`}}
                    >
                        <div className="article_intro_image_panels">
                            <span className="panel">
                                Подборка туристических пакетов
                            </span>
                            <span className="panel">
                                от 258 200 ₽
                            </span>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
}

export default ArticleIntro;