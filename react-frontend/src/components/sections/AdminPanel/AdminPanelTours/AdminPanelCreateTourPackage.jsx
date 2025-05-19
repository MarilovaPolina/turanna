import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import bedIcon from '../../../../assets/img/icons/bed.png';
import uploadImageIcon from '../../../../assets/img/icons/upload_image.png';
import TextEditor from '../../../common/TextEditor/TextEditor';
import {
  createTourPackage,
  addTourVariant,
  removeTourVariant,
  copyTourVariant,
  updateTourVariantField,
  resetSuccess,
  resetTourVariants
} from '../../../../store/tourPackagesSlice';
import TourVariantDetails from './TourVariantDetails';
import HotelImageUploader from './HotelImageUploader';

const AdminPanelCreateTourPackage = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [errors, setErrors] = React.useState({});
  const [imageErrors, setImageErrors] = React.useState('');
  const [submitError, setSubmitError] = React.useState('');
  const tourVariants = useSelector((state) => state.tourPackage.tourVariants);
  const [hotelImages, setHotelImages] = React.useState([]);
  const { error, success, loading } = useSelector((state) => state.tourPackage);

  const [descriptionData, setDescriptionData] = React.useState({
    time: new Date().getTime(),
    blocks: [],
  });

  React.useEffect(() => {
    dispatch(resetSuccess());
  }, [dispatch]);

  const [formData, setFormData] = React.useState({
    package_name: '',
    departure_city: '',
    arrival_city: '',
    description: '',
    galleryImages: [],
  });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleGalleryImagesChange = (e) => {
    const files = Array.from(e.target.files);
    let hasError = false;

    const newImages = [];

    files.forEach((file) => {
      if (file.size > 8 * 1024 * 1024) {
        setImageErrors(
          'Размер одного из изображений слишком большой. Максимальный размер файла — 8 МБ.',
        );
        hasError = true;
      } else {
        newImages.push({
          file,
          preview: URL.createObjectURL(file),
        });
      }
    });

    if (!hasError) {
      setImageErrors('');
    }

    if (newImages.length > 0) {
      setFormData({
        ...formData,
        galleryImages: [...formData.galleryImages, ...newImages],
      });
    }
  };

  const handleTourVariantChange = (index, e) => {
    const { name, value } = e.target;
    dispatch(updateTourVariantField({ index, field: name.replace(`_${index}`, ''), value }));
  };

  const handleHotelImageChange = (index, e) => {
    const file = e.target.files[0];

    if (!file) return;

    const updated = [...hotelImages];
    updated[index] = {
      file,
      preview: URL.createObjectURL(file),
    };
    setHotelImages(updated);
  };

  const validateForm = () => {
    const newErrors = {};
    let imageErrorMessage = '';

    if (!formData.package_name) newErrors.package_name = 'Обязательное поле';
    if (!formData.departure_city) newErrors.departure_city = 'Обязательное поле';
    if (!formData.arrival_city) newErrors.arrival_city = 'Обязательное поле';

    if (formData.galleryImages.length < 1) {
      imageErrorMessage = 'Добавьте хотя бы 1 фото в галерею изображений.';
    }

    if (tourVariants.length < 1) {
      imageErrorMessage =
        'Добавьте хотя бы один тур в подборку. Если вам не нужно опубликовать тур, вы можете создать статью.';
    } else {
      tourVariants.forEach((variant, index) => {
        if (!variant.hotel_name) newErrors[`hotel_name_${index}`] = 'Обязательное поле';
        if (!variant.tour_start) newErrors[`tour_start_${index}`] = 'Обязательное поле';
        if (!variant.tour_finish) newErrors[`tour_finish_${index}`] = 'Обязательное поле';
        if (!variant.arrival_country) newErrors[`variant_arrival_country_${index}`] = 'Обязательное поле';
        if (!variant.tour_nights) newErrors[`tour_nights_${index}`] = 'Обязательное поле';
        if (variant.tour_nights < 0)
          newErrors[`tour_nights_${index}`] = 'Количество ночей не может быть меньше ноля';
        if (!variant.tour_price) newErrors[`tour_price_${index}`] = 'Обязательное поле';
        if (variant.tour_price < 0)
          newErrors[`tour_price_${index}`] = 'Цена тура не может быть меньше ноля';
        if (!variant.tour_category) newErrors[`tour_category_${index}`] = 'Обязательное поле';
        if (!hotelImages[index] || !hotelImages[index].file) {
          if (!imageErrorMessage) {
            imageErrorMessage = 'Добавьте фото отеля к каждому варианту тура.';
          }
        }

        if (variant.tour_start && variant.tour_finish) {
          const startDate = new Date(variant.tour_start);
          const finishDate = new Date(variant.tour_finish);

          if (finishDate <= startDate) {
            newErrors[`tour_finish_${index}`] = 'Дата окончания должна быть позже даты начала';
          }
        }
      });
    }
    setErrors(newErrors);
    setImageErrors(imageErrorMessage);

    return Object.keys(newErrors).length === 0 && !imageErrorMessage;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setErrors({});
    setImageErrors('');
    setSubmitError('');

    const isValid = validateForm();
    if (!isValid) {
      if (!imageErrors) {
        setSubmitError(
          'В полях есть ошибки. Пожалуйста, исправьте ошибки и попробуйте сохранить подборку еще раз.',
        );
      }
      return;
    }

    const fullData = {
      ...formData,
      description: descriptionData,
      hotelImages,
      tourVariants,
    };

    try {
      const result = await dispatch(createTourPackage(fullData)).unwrap();
      dispatch(resetTourVariants());
    } catch (error) {
      if (typeof error === 'string' && error.includes('The main image must be a file of type')) {
        setSubmitError(
          'Недопустимый формат одного из изображений. Разрешены только: JPEG, PNG, JPG, SVG. Попробуйте пересохранить изображение или выбрать другое.',
        );
      } else {
        setSubmitError(error || 'Ошибка при сохранении. Пожалуйста, попробуйте позже.');
      }
    }
  };

  return (
    <div className="admin_panel_content">
      <div className="creation_heading">
        <p className="small_title_text">Создать подборку туров</p>
        <p className="creation_heading_subtitle">
          Создайте туристическую подборку, включающую один или несколько вариантов путешествий.
          Добавьте описание и загрузите фото в слайдер изображений, чтобы сделать подборку
          привлекательной и полезной для клиентов.
        </p>
      </div>

      <div className="form_container">
        <form onSubmit={handleSubmit}>
          <div className="form_group">
            <label htmlFor="package_name">
              Название подборки (Напр. страна, туристическое направление или название отеля )
              <span className="star">*</span>
            </label>
            <input
              type="text"
              className={`admin_input ${errors.package_name ? 'error_input' : ''}`}
              placeholder="Кратко, без лишних деталей – Египет (до 40 символов)"
              name="package_name"
              maxLength="40"
              value={formData.package_name}
              onChange={handleInputChange}
              required
            />
            {errors.package_name && <span className="error_msg">{errors.package_name}</span>}
          </div>

          <div className="form_group">
            <label htmlFor="departure_city">
              Город отправления <span className="star">*</span>
            </label>
            <input
              type="text"
              className={`admin_input ${errors.departure_city ? 'error_input' : ''}`}
              placeholder="Город отправления"
              name="departure_city"
              value={formData.departure_city}
              onChange={handleInputChange}
              required
            />
            {errors.departure_city && <span className="error_msg">{errors.departure_city}</span>}
          </div>

          <div className="form_group">
            <label htmlFor="arrival_city">
              Город прибытия <span className="star">*</span>
            </label>
            <input
              type="text"
              className={`admin_input ${errors.arrival_city ? 'error_input' : ''}`}
              placeholder="Город прибытия"
              name="arrival_city"
              value={formData.arrival_city}
              onChange={handleInputChange}
              required
            />
            {errors.arrival_city && <span className="error_msg">{errors.arrival_city}</span>}
          </div>

          <div className="form_group">
            <label htmlFor="description">Описание</label>
            <div className="text_editor_wrapper">
              <div className="text_editor_content">
                <TextEditor
                  data={descriptionData}
                  onChange={setDescriptionData}
                  editorBlock="create-tour-package-description"
                />
              </div>
            </div>
          </div>

          <div className="upload_image_gallery">
            <label htmlFor="galleryImages">Галерея изображений</label>
            <div className="uploaded_images_wrapper">
              {formData.galleryImages.map((img, idx) => (
                <div className="uploaded_image" key={idx}>
                  <img src={img.preview} alt={`Галерея ${idx}`} />
                </div>
              ))}

              <div className="input_file_wrapper">
                <label htmlFor="fileUpload" style={{ cursor: 'pointer' }}>
                  <img src={uploadImageIcon} alt="Загрузить" />
                  Нажмите, чтобы добавить фото
                </label>
                <input
                  type="file"
                  id="fileUpload"
                  multiple
                  accept="image/png, image/jpeg, image/jpg, image/svg"
                  onChange={handleGalleryImagesChange}
                  style={{ display: 'none' }}
                />
              </div>
            </div>
          </div>

          <div className="create_tour_variants_block">
            <p className="small_title_text">Варианты туров</p>

            {tourVariants.map((variant, index) => (
              <div className="tour_creation_wrapper" key={index}>
                <div className="tour_creation_description">
                  <HotelImageUploader
                    image={hotelImages[index]}
                    index={index}
                    onChange={handleHotelImageChange}
                  />
                  <div className="tour_creation_inputs">
                    <div className="form_group">
                      <label htmlFor={`hotel_name_${index}`}>
                        Название отеля <span className="star">*</span>
                      </label>
                      <input
                        type="text"
                        className={`admin_input ${
                          errors[`hotel_name_${index}`] ? 'error_input' : ''
                        }`}
                        placeholder="Название отеля"
                        name="hotel_name"
                        value={variant.hotel_name}
                        onChange={(e) => handleTourVariantChange(index, e)}
                        required
                      />
                      {errors[`hotel_name_${index}`] && (
                        <span className="error_msg">{errors[`hotel_name_${index}`]}</span>
                      )}
                    </div>

                    <div className="divided_three_inputs">
                      <div className="form_group">
                        <label htmlFor={`departure_city_${index}`}>Город отправления</label>
                        <input
                          type="text"
                          className={`admin_input ${
                            errors[`variant_departure_city_${index}`] ? 'error_input' : ''
                          }`}
                          placeholder="Город отправления"
                          name="departure_city"
                          value={variant.departure_city}
                          onChange={(e) => handleTourVariantChange(index, e)}
                        />
                        {errors[`variant_departure_city_${index}`] && (
                          <span className="error_msg">
                            {errors[`variant_departure_city_${index}`]}
                          </span>
                        )}
                      </div>
                      <div className="form_group">
                        <label htmlFor={`arrival_city_${index}`}>Город прибытия</label>
                        <input
                          type="text"
                          className={`admin_input ${
                            errors[`variant_arrival_city_${index}`] ? 'error_input' : ''
                          }`}
                          placeholder="Город прибытия"
                          name="arrival_city"
                          value={variant.arrival_city}
                          onChange={(e) => handleTourVariantChange(index, e)}
                        />
                        {errors[`variant_arrival_city_${index}`] && (
                          <span className="error_msg">
                            {errors[`variant_arrival_city_${index}`]}
                          </span>
                        )}
                      </div>
                      <div className="form_group">
                        <label htmlFor={`arrival_country_${index}`}>Страна прибытия <span className="star">*</span></label>
                        <input
                          type="text"
                          className={`admin_input ${
                            errors[`variant_arrival_country_${index}`] ? 'error_input' : ''
                          }`}
                          placeholder="Страна прибытия"
                          name="arrival_country"
                          value={variant.arrival_country}
                          onChange={(e) => handleTourVariantChange(index, e)}
                          required
                        />
                        {errors[`variant_arrival_city_${index}`] && (
                          <span className="error_msg">
                            {errors[`variant_arrival_country_${index}`]}
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
                          <span className="error_msg">{errors[`tour_start_${index}`]}</span>
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
                          <span className="error_msg">{errors[`tour_finish_${index}`]}</span>
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
                          <span className="error_msg">{errors[`tour_nights_${index}`]}</span>
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
                          <span className="error_msg">{errors[`tour_price_${index}`]}</span>
                        )}
                      </div>

                      <div className="radio_btns_wrapper">
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
                    <div className="divided_three_inputs">
                      <div className="form_group">
                        <label htmlFor={`image_text_copyright_${index}`}>Автор фото</label>
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
                          <span className="error_msg">
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
                          <span className="error_msg">
                            {errors[`variant_image_link_copyright_${index}`]}
                          </span>
                        )}
                      </div>

                      <div className="form_group">
                        <label htmlFor={`tour_category_${index}`}>
                          Тип тура <span className="star">*</span>
                        </label>
                        <select
                          className="admin_input"
                          name="tour_category"
                          value={variant.tour_category}
                          onChange={(e) => handleTourVariantChange(index, e)}
                          required
                        >
                          <option value=""></option>
                          <option value="Пляжный">Пляжный</option>
                          <option value="Экскурсионный">Экскурсионный</option>
                          <option value="Для школьников">Для школьников</option>
                          <option value="Лечебный">Лечебный</option>
                          <option value="Морской круиз">Морской круиз</option>
                          <option value="Горнолыжный">Горнолыжный</option>
                          <option value="Индивидуальный">Индивидуальный</option>
                          <option value="Образование за рубежом">Образование за рубежом</option>
                        </select>
                      </div>
                    </div>
                  </div>
                </div>

                <TourVariantDetails
                  index={index}
                  variant={variant}
                  handleTourVariantChange={handleTourVariantChange}
                />

                <div className="tour_actions_btns">
                  <button
                    type="button"
                    className="copy_tour"
                    onClick={() => dispatch(copyTourVariant(index))}
                  >
                    Скопировать вариант
                  </button>
                  <button
                    type="button"
                    className="delete_tour"
                    onClick={() => dispatch(removeTourVariant(index))}
                  >
                    Удалить вариант
                  </button>
                </div>
              </div>
            ))}

            <div className="create_tour_variant_btn">
              <div className="input_file_wrapper" onClick={() => dispatch(addTourVariant())}>
                + Нажмите, чтобы добавить вариант тура
              </div>
            </div>
          </div>

          <button type="submit" className="blue_btn" disabled={loading}>
            {loading ? 'Сохранение...' : 'Сохранить'}
          </button>
          <button onClick={() => navigate(-1)} className='cancel_btn'>
            Отмена
          </button>

          <div className="message_info_block">
            {imageErrors && <div className="error_msg">{imageErrors}</div>}
            {submitError && <div className="error_msg">{submitError}</div>}
            {error && <div className="error_msg">{error}</div>}

            {success && (
             <div className="success_msg">
                <p>Туристическая подборка успешно обновлена.  
                    <button onClick={() => navigate(-1)} className='cancel_btn'>
                    Перейти в админ-панель
                </button>
                </p>
              </div>
            )}
          </div>
        </form>
      </div>
    </div>
  );
};

export default AdminPanelCreateTourPackage;
