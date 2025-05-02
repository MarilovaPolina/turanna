import React from "react";
import PhotosSlider from "./PhotosSlider";

import egypt from '../../../../assets/img/egypt.png';

function AboutVacationPackage(){
    return(
        <>
            <div className="about_vacation_package">
                <p className="title_text">
                    о подборке
                </p>
                <p>
                    Подборка для 2-х взрослых с вылетом из Казани, все включено! Отели, которые регулярно выбирают наши туристы. Для бронирования оставьте свои данные в онлайн-заявке :)
                </p>

                <PhotosSlider />
            </div>

        </>
    );
}

export default AboutVacationPackage;