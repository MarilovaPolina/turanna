import React from "react";
import {
    PrevButton,
    NextButton,
    usePrevNextButtons
} from './PhotosSliderButtons'
import useEmblaCarousel from 'embla-carousel-react';

import PhotoPopup from "../../../common/PhotoPopup/PhotoPopup";

import egypt from '../../../../assets/img/egypt.png';
import handCall from '../../../../assets/img/hand_call.png'; 

function PhotosSlider() {
    const [isPopupOpen, setIsPopupOpen] = React.useState(false);
    const [popupImg, setPopupImg] = React.useState("");
    const [emblaRef, emblaApi] = useEmblaCarousel({
        align: "start",
        slidesToScroll: 1,
        containScroll: "trimSnaps"
    });

    const scrollPrev = React.useCallback(() => {
        if (emblaApi) emblaApi.scrollPrev();
    }, [emblaApi]);

    const scrollNext = React.useCallback(() => {
        if (emblaApi) emblaApi.scrollNext();
    }, [emblaApi]);

    const {
        prevBtnDisabled,
        nextBtnDisabled,
        onPrevButtonClick,
        onNextButtonClick
    } = usePrevNextButtons(emblaApi);

    // Попап с фото 
    const openPopup = (image) => {
        setPopupImg(image);
        setIsPopupOpen(true);
    };

    const closePopup = () => {
        setIsPopupOpen(false);
    };

    const photosArray=[
        {
            "id": "1",
            "img": '/assets/img/ogrn.png',
            "title": "Свидетельство о регистрации в Об...",
        },
        {
            "id": "2",
            "img": '/assets/img/lic.jpeg',
            "title": "Лицензия на турагентсткую д...",
        },
    ]
        
    return (
        <>
            <div className="photos_slider">
            <section className="embla">
                    <div className="embla__viewport" ref={emblaRef}>
                        <div className="embla__container">
                            {photosArray.map((photo, index) =>
                                <div onClick={() => openPopup(photo.img)} key={`${index}_${photo.title}`} className="embla__slide" >
                                    <img src={photo.img} />
                                </div>
                            )}
                        
                        </div>
                    </div>

                    <div className="embla__controls">
                        <div className="embla__buttons">
                        <PrevButton onClick={onPrevButtonClick} disabled={prevBtnDisabled} />
                        <NextButton onClick={onNextButtonClick} disabled={nextBtnDisabled} />
                        </div>
                    </div>
                </section>
            </div>
            {isPopupOpen && (
                <PhotoPopup 
                    image={popupImg} 
                    onClose={closePopup} 
                />
            )}
        </>
        
    );
}

export default PhotosSlider;