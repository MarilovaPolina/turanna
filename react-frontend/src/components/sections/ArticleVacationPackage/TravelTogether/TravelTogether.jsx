import React from "react";

import link from '../../../../assets/img/icons/link.png';
import megaphone from '../../../../assets/img/megaphone.png';

function TravelTogether(){
    return(
        <>
           <div className="travel_together_block">
                <div className="travel_together_text">
                    <p className="small_title_text">
                        Путешествуйте вместе
                    </p>
                    <p className="description">
                        Поделитесь ссылкой на подборку с друзьями через мессенджер. Отправляйтесь в тур вместе и создавайте совместные воспоминания!
                    </p>

                    <div className="copy_link_block">
                        <button className="copy_link_panel"> 
                            <img src={link} loading="lazy" />                               
                        </button>
                    </div>
                </div>
                <div className="travel_together_image">
                    <img src={megaphone} loading="lazy" />
                </div>
            </div>
        </>
    );
}

export default TravelTogether;