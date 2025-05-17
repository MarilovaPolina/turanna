import React from 'react';

const HotelImageUploader = ({ image, index, onChange, inputIdPrefix = 'hotel_image_' }) => {
  return (
    <div className="tour_creation_photo">
      <label htmlFor={`${inputIdPrefix}${index}`}>
        Фото отеля <span className="star">*</span>
        <div className="input_file_wrapper" style={{ cursor: 'pointer' }}>
          {image?.preview ? (
            <img src={image.preview} alt="Фото отеля" />
          ) : (
            <span>Нажмите, чтобы загрузить фото</span>
          )}
          <input
            type="file"
            accept="image/png, image/jpeg, image/jpg, image/svg"
            id={`${inputIdPrefix}${index}`}
            onChange={(e) => onChange(index, e)}
            style={{ display: 'none' }}
          />
        </div>
      </label>
    </div>
  );
};

export default HotelImageUploader;
