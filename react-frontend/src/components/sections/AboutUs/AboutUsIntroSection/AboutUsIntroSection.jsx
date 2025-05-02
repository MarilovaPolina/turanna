import React from "react";

import introPhoto from '../../../../assets/img/about_us_intro_photo.png';

function AboutUsIntroSection(){
    return(
        <>
            <div className="about_us_intro">
                <div className="container">
                    <div className="about_us_intro_text">
                        <p className="large_text">
                            О нас
                        </p>
                        <p className="subtitle_text">
                            Работаем с 2017 года, чтобы сделать процесс планирования путешествий простым и удобным
                            специально для вас.
                        </p>
                    </div>
                    <div className="about_us_intro_photo">
                        <img src={introPhoto} />
                    </div>
                </div>
            </div>
        </>
    );
}

export default AboutUsIntroSection;