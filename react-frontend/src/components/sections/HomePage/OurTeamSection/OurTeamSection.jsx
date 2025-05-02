import React from "react";

import togetherPhoto from '../../../../assets/img/together_photo.png'; 

function OurTeam(){
    return(
            <div className="our_team_block">
                <div className="container">
                    <div className="our_team_content">
                        <div className="our_team_text">
                            <p className="title_text">
                                поможем определиться <br />с <span>идеальным</span> вариантом<br />отеля или тура
                            </p>
                            <p className="subtitle_text">
                                Вы можете положиться на наших профессионалов в области туризма. Наша команда, работающая
                                в этой сфере с 2002 года, имеет большой опыт и поможет вам сделать правильный выбор.
                                <br /><br />
                                С 2017 года наше турагентство успешно предоставляет в Ижевске услуги по организации
                                незабываемых поездок, гарантируя персонализированный подход к каждому клиенту.
                            </p>
                        </div>
                        <img className="photo_together" src={togetherPhoto} loading="lazy" />
                    </div>

                </div>
                <div className="paper_photo_bg"></div>
            </div>
    );
}

export default OurTeam;