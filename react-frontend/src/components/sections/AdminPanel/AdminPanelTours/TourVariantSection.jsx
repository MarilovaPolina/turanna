import React from 'react';
import TourVariantDetailsSection from './TourVariantDetailsSection';

const TourVariantSection = ({ variant, index, handleTourVariantChange, handleHotelImageChange, errors }) => (
  <div className="tour_creation_wrapper">
    <div className="tour_creation_description">
      <div className="tour_creation_photo">
        <label htmlFor={`hotel_image_${index}`}>
          Фото отеля <span className="star">*</span>
          <div className="input_file_wrapper" style={{ cursor: 'pointer' }}>
            {variant.hotel_image ? (
              <img src={variant.hotel_image.preview} alt="Фото отеля" />
            ) : (
              <span>Нажмите, чтобы загрузить фото</span>
            )}
            <input
              type="file"
              accept="image/png, image/jpeg, image/jpg, image/svg"
              name="hotel_image"
              id={`hotel_image_${index}`}
              onChange={(e) => handleHotelImageChange(index, e)}
              style={{ display: 'none' }}
            />
          </div>
        </label>
      </div>

      <div className="tour_creation_inputs">
        <div className="form_group">
          <label htmlFor={`hotel_name_${index}`}>Название отеля <span className="star">*</span></label>
          <input
            type="text"
            className={`admin_input ${errors[`hotel_name_${index}`] ? 'error_input' : ''}`}
            placeholder="Название отеля"
            name="hotel_name"
            value={variant.hotel_name}
            onChange={(e) => handleTourVariantChange(index, e)}
            required
          />
          {errors[`hotel_name_${index}`] && <span className="error_text">{errors[`hotel_name_${index}`]}</span>}
        </div>
        <div className="divided_two_inputs">
                      <div className="form_group">
                        <label htmlFor={`departure_city_${index}`}>
                          Город отправления <span className="star">*</span>
                        </label>
                        <input
                          type="text"
                          className={`admin_input ${
                            errors[`variant_departure_city_${index}`] ? 'error_input' : ''
                          }`}
                          placeholder="Город отправления"
                          name="departure_city"
                          value={variant.departure_city}
                          onChange={(e) => handleTourVariantChange(index, e)}
                          required
                        />
                        {errors[`variant_departure_city_${index}`] && (
                          <span className="error_text">
                            {errors[`variant_departure_city_${index}`]}
                          </span>
                        )}
                      </div>
                      <div className="form_group">
                        <label htmlFor={`arrival_city_${index}`}>
                          Город прибытия <span className="star">*</span>
                        </label>
                        <input
                          type="text"
                          className={`admin_input ${
                            errors[`variant_arrival_city_${index}`] ? 'error_input' : ''
                          }`}
                          placeholder="Город прибытия"
                          name="arrival_city"
                          value={variant.arrival_city}
                          onChange={(e) => handleTourVariantChange(index, e)}
                          required
                        />
                        {errors[`variant_arrival_city_${index}`] && (
                          <span className="error_text">
                            {errors[`variant_arrival_city_${index}`]}
                          </span>
                        )}
                      </div>
        </div>

        <div className="about_tour">
            <div className="form_group">
            <label htmlFor={`tour_start_${index}`}>
                Начало тура <span className="star">*</span>
            </label>
            <input
                type="date"
                className={`admin_input ${
                errors[`tour_start_${index}`] ? 'error_input' : ''
                }`}
                name="tour_start"
                value={variant.tour_start}
                onChange={(e) => handleTourVariantChange(index, e)}
                required
            />
            {errors[`tour_start_${index}`] && (
                <span className="error_text">{errors[`tour_start_${index}`]}</span>
            )}
            </div>
            <div className="form_group">
            <label htmlFor={`tour_finish_${index}`}>
                Посл. день тура <span className="star">*</span>
            </label>
            <input
                type="date"
                className={`admin_input ${
                errors[`tour_finish_${index}`] ? 'error_input' : ''
                }`}
                name="tour_finish"
                value={variant.tour_finish}
                onChange={(e) => handleTourVariantChange(index, e)}
                required
            />
            {errors[`tour_finish_${index}`] && (
                <span className="error_text">{errors[`tour_finish_${index}`]}</span>
            )}
            </div>
            <div className="form_group">
            <label htmlFor={`tour_nights_${index}`}>
                Количество ночей <span className="star">*</span>
            </label>
            <input
                type="number"
                className={`admin_input ${
                errors[`tour_nights_${index}`] ? 'error_input' : ''
                }`}
                name="tour_nights"
                value={variant.tour_nights}
                onChange={(e) => handleTourVariantChange(index, e)}
                required
            />
            {errors[`tour_nights_${index}`] && (
                <span className="error_text">{errors[`tour_nights_${index}`]}</span>
            )}
            </div>
        </div>

        <div className="divided_two_inputs">
            <div className="form_group">
            <label htmlFor={`tour_price_${index}`}>
                Цена <span className="star">*</span>
            </label>
            <input
                type="number"
                className={`admin_input ${
                errors[`tour_price_${index}`] ? 'error_input' : ''
                }`}
                name="tour_price"
                value={variant.tour_price}
                onChange={(e) => handleTourVariantChange(index, e)}
                required
            />
            {errors[`tour_price_${index}`] && (
                <span className="error_text">{errors[`tour_price_${index}`]}</span>
            )}
            </div>

            <div className="radio_btns_wrapper" >
            <div className="radio_wrapper">
                <input
                id={`per_person_${index}`}
                type="radio"
                name={`price_type_${index}`}
                value="per_person"
                checked={variant.price_type === 'per_person'}
                onChange={(e) => handleTourVariantChange(index, e)}
                />
                <label htmlFor={`per_person_${index}`}>цена за одного</label>
            </div>
            <div className="radio_wrapper">
                <input
                id={`per_couple_${index}`}
                type="radio"
                name={`price_type_${index}`}
                value="per_couple"
                checked={variant.price_type === 'per_couple'}
                onChange={(e) => handleTourVariantChange(index, e)}
                />
                <label htmlFor={`per_couple_${index}`}>цена за двоих</label>
            </div>
            </div>

            
            
        </div>

        <div className="divided_two_inputs">
            <div className="form_group">
                <label htmlFor={`image_text_copyright_${index}`}>
                Автор фото
                </label>
                <input
                type="text"
                className={`admin_input ${
                    errors[`variant_image_text_copyright_${index}`] ? 'error_input' : ''
                }`}
                placeholder="Имя и фамилия автора"
                name="image_text_copyright"
                value={variant.image_text_copyright}
                onChange={(e) => handleTourVariantChange(index, e)}
                />
                {errors[`variant_image_text_copyright_${index}`] && (
                <span className="error_text">
                    {errors[`variant_image_text_copyright_${index}`]}
                </span>
                )}
            </div>

            <div className="form_group">
                <label htmlFor={`image_link_copyright_${index}`}>
                Ссылка на автора фото
                </label>
                <input
                type="text"
                className={`admin_input ${
                    errors[`variant_image_link_copyright_${index}`] ? 'error_input' : ''
                }`}
                placeholder="https://example.com/author"
                name="image_link_copyright"
                value={variant.image_link_copyright}
                onChange={(e) => handleTourVariantChange(index, e)}
                />
                {errors[`variant_image_link_copyright_${index}`] && (
                <span className="error_text">
                    {errors[`variant_image_link_copyright_${index}`]}
                </span>
                )}
            </div>
        </div>
      </div>
    </div>

    <TourVariantDetailsSection
        index={index}
        variant={variant}
        handleTourVariantChange={handleTourVariantChange}
    />
  </div>
);

export default TourVariantSection;
