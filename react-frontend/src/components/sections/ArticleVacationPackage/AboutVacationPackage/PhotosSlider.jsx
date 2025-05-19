import React from "react";
import {
  PrevButton,
  NextButton,
  usePrevNextButtons
} from './PhotosSliderButtons';
import useEmblaCarousel from 'embla-carousel-react';
import PhotoPopup from "../../../common/PhotoPopup/PhotoPopup";

function PhotosSlider({ images }) {
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

  const openPopup = (image) => {
    setPopupImg(image);
    setIsPopupOpen(true);
  };

  const closePopup = () => {
    setIsPopupOpen(false);
  };

  const baseUrl = 'http://localhost:8000';

  return (
    <>
      <div className="photos_slider">
        <section className="embla">
          <div className="embla__viewport" ref={emblaRef}>
            <div className="embla__container">
              {images.map((imgObj, index) => (
                <div
                  key={imgObj.id || index}
                  className="embla__slide"
                  onClick={() => openPopup(baseUrl + imgObj.image_path)}
                >
                  <img src={baseUrl + imgObj.image_path} alt={`image_${index}`} />
                </div>
              ))}
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
