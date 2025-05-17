import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { useParams } from 'react-router-dom';
import {
  getTourPackageById,
  updateTourPackage,
  resetSuccess,
} from '../../../../store/tourPackagesSlice';
import TextEditor from '../../../common/TextEditor/TextEditor';
import TourVariantDetails from './TourVariantDetails';
import HotelImageUploader from './HotelImageUploader';

import bedIcon from '../../../../assets/img/icons/bed.png';
import uploadImageIcon from '../../../../assets/img/icons/upload_image.png';

const AdminPanelEditTourPackage = () => {
  const navigate = useNavigate();
  const { id } = useParams();
  const dispatch = useDispatch();
  const editorRef = React.useRef(null);
  const [errors, setErrors] = React.useState({});
  const { loading, error, selectedPackage, success } = useSelector((state) => state.tourPackage);
  const [imageErrors, setImageErrors] = React.useState('');
  const [submitError, setSubmitError] = React.useState('');

  const [formData, setFormData] = React.useState({
    package_name: '',
    departure_city: '',
    arrival_city: '',
    description: '',
    editorData: null,
    initialData: null,
    galleryImages: [],
    tourVariants: [],
    hotelImages: [],
  });

  React.useEffect(() => {
    dispatch(resetSuccess());
    dispatch(getTourPackageById(id)).then((res) => {
      const data = res.payload;
      const parsedDescription =
        typeof data.description === 'string' ? JSON.parse(data.description) : data.description;

      const hotelImages = data.tours.map((tour) => ({
        preview: `http://localhost:8000${tour.hotel_image}`,
        id: tour.id,
      }));

      setFormData({
        package_name: data.title,
        departure_city: data.departure_city,
        arrival_city: data.arrival_city,
        description: parsedDescription,
        editorData: parsedDescription,
        initialData: parsedDescription,
        galleryImages: data.images.map((img) => ({ preview: img.image_path, id: img.id })),
        tourVariants: data.tours.map((tour) => ({
          ...tour,
          ...tour.details,
          id: tour.id,
          tour_start: tour.start_date?.slice(0, 10),
          tour_finish: tour.end_date?.slice(0, 10),
          tour_nights: tour.nights,
          tour_price: tour.price,
          file: null,
        })),
        hotelImages,
      });
    });
  }, [dispatch, id]);

  const handleChange = (field, value) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
  };

  const handleEditorChange = (newData) => {
    setFormData((prev) => ({ ...prev, editorData: newData }));
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
      setFormData((prev) => ({
        ...prev,
        galleryImages: [...prev.galleryImages, ...newImages],
      }));
    }
  };

  const handleHotelImageChange = (index, e) => {
    const file = e.target.files[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onloadend = () => {
      const updatedImages = [...formData.hotelImages];
      updatedImages[index] = {
        file,
        preview: reader.result,
      };
      setFormData((prev) => ({
        ...prev,
        hotelImages: updatedImages,
      }));
    };
    reader.readAsDataURL(file);
  };

  const addTourVariant = () => {
    setFormData((prev) => ({
      ...prev,
      tourVariants: [
        ...prev.tourVariants,
        {
          hotel_name: '',
          hotel_image: null,
          departure_city: '',
          arrival_city: '',
          arrival_country: '',
          tour_start: '',
          tour_finish: '',
          tour_nights: '',
          tour_price: '',
          price_type: 'per_person',
          status: 'active',
          image_text_copyright: '',
          image_link_copyright: '',
          tour_category: '',
          article_number: '',
          room_class: '',
          age_limit: '',
          all_inclusive: '',
          hotel_link: '',
          distance_center: '',
          distance_airport: '',
          distance_lift: '',
          distance_nature: '',
          distance_beach: '',
          beach_type: '',
          childcare: '',
          pool: '',
          gym: '',
          pets_allowed: '',
          airline: '',
          visa_required: '',
        },
      ],
    }));
  };

  const removeTourVariant = (index) => {
    setFormData((prev) => ({
      ...prev,
      tourVariants: prev.tourVariants.filter((_, i) => i !== index),
    }));
  };

  const copyTourVariant = (index) => {
    const toCopy = { ...formData.tourVariants[index] };
    delete toCopy.id;

    setFormData((prev) => ({
      ...prev,
      tourVariants: [...prev.tourVariants, toCopy],
    }));
  };

  const handleTourVariantChange = (index, e) => {
    const { name, value } = e.target;
    const updated = [...formData.tourVariants];
    updated[index][name] = value;
    setFormData({ ...formData, tourVariants: updated });
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

    if (formData.tourVariants.length < 1) {
      imageErrorMessage =
        'Добавьте хотя бы один тур в подборку. Если вам не нужно опубликовать тур, вы можете создать статью.';
    } else {
      formData.tourVariants.forEach((variant, index) => {
        if (!variant.hotel_name) newErrors[`hotel_name_${index}`] = 'Обязательное поле';
        if (!variant.tour_start) newErrors[`tour_start_${index}`] = 'Обязательное поле';
        if (!variant.tour_finish) newErrors[`tour_finish_${index}`] = 'Обязательное поле';
        if (!variant.tour_nights) newErrors[`tour_nights_${index}`] = 'Обязательное поле';
        if (variant.tour_nights < 0)
          newErrors[`tour_nights_${index}`] = 'Количество ночей не может быть меньше ноля';
        if (!variant.tour_price) newErrors[`tour_price_${index}`] = 'Обязательное поле';
        if (variant.tour_price < 0)
          newErrors[`tour_price_${index}`] = 'Цена тура не может быть меньше ноля';
        if (!variant.tour_category) newErrors[`tour_category_${index}`] = 'Обязательное поле';

        if (
          !formData.hotelImages[index] ||
          (!formData.hotelImages[index].file && !formData.hotelImages[index].preview)
        ) {
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

  const handleSubmit = (e) => {
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
    dispatch(
      updateTourPackage({ id, formState: { ...formData, description: formData.editorData } }),
    ).then((result) => {
      if (result.error) {
        if (
          typeof result.error === 'string' &&
          result.error.includes('The main image must be a file of type')
        ) {
          setSubmitError(
            'Недопустимый формат одного из изображений. Разрешены только: JPEG, PNG, JPG, SVG. Попробуйте пересохранить изображение или выбрать другое.',
          );
        } else {
          setSubmitError(result.error || 'Ошибка при сохранении. Пожалуйста, попробуйте позже.');
        }
      }
    });
  };

  return (
    <div className="admin_panel_content">
      <div className="creation_heading">
        <p className="small_title_text">Редактирование туристической подборки</p>
        <p className="creation_heading_subtitle">
          Вы можете удалить или изменить туры в подборке, изменить описание самой туристической
          подборки или добавить в нее новые фото.
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
              onChange={(e) => handleChange('package_name', e.target.value)}
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
              onChange={(e) => handleChange('departure_city', e.target.value)}
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
              onChange={(e) => handleChange('arrival_city', e.target.value)}
              required
            />
            {errors.arrival_city && <span className="error_msg">{errors.arrival_city}</span>}
          </div>

          <label>Содержание</label>
          <div className={`text_editor_wrapper`}>
            <div className="text_editor_content">
              {formData.editorData && (
                <TextEditor
                  data={formData.initialData}
                  editorBlock="editorjs-container"
                  editorRef={editorRef}
                  onChange={handleEditorChange}
                />
              )}
            </div>
          </div>

          <div className="upload_image_gallery">
            <label htmlFor="galleryImages">Галерея изображений</label>
            <div className="uploaded_images_wrapper">
              {formData.galleryImages.map((img, idx) => (
                <div className="uploaded_image" key={idx}>
                  <img
                    src={img.file ? img.preview : `http://localhost:8000${img.preview}`}
                    alt={`Галерея ${idx}`}
                  />
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
            {imageErrors && <div className="error_msg">{imageErrors}</div>}
          </div>

          <div className="create_tour_variants_block">
            <p className="small_title_text">Варианты туров</p>

            {formData.tourVariants.map((variant, index) => (
              <div className="tour_creation_wrapper" key={index}>
                <div className="tour_creation_description">
                  <HotelImageUploader
                    image={formData.hotelImages[index]}
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
                        className="admin_input"
                        placeholder="Название отеля"
                        name="hotel_name"
                        value={variant.hotel_name}
                        onChange={(e) => handleTourVariantChange(index, e)}
                        required
                      />
                    </div>

                    <div className="divided_three_inputs">
                      <div className="form_group">
                        <label>Город отправления</label>
                        <input
                          type="text"
                          className="admin_input"
                          name="departure_city"
                          value={variant.departure_city}
                          onChange={(e) => handleTourVariantChange(index, e)}
                        />
                      </div>
                      <div className="form_group">
                        <label>Город прибытия</label>
                        <input
                          type="text"
                          className="admin_input"
                          name="arrival_city"
                          value={variant.arrival_city}
                          onChange={(e) => handleTourVariantChange(index, e)}
                        />
                      </div>
                      <div className="form_group">
                        <label>Страна прибытия</label>
                        <input
                          type="text"
                          className="admin_input"
                          name="arrival_country"
                          value={variant.arrival_country}
                          onChange={(e) => handleTourVariantChange(index, e)}
                        />
                      </div>
                    </div>

                    <div className="about_tour">
                      <div className="form_group">
                        <label>
                          Начало тура <span className="star">*</span>
                        </label>
                        <input
                          type="date"
                          className="admin_input"
                          name="tour_start"
                          value={variant.tour_start}
                          onChange={(e) => handleTourVariantChange(index, e)}
                          required
                        />
                      </div>
                      <div className="form_group">
                        <label>
                          Посл. день тура <span className="star">*</span>
                        </label>
                        <input
                          type="date"
                          className="admin_input"
                          name="tour_finish"
                          value={variant.tour_finish}
                          onChange={(e) => handleTourVariantChange(index, e)}
                          required
                        />
                      </div>
                      <div className="form_group">
                        <label>
                          Количество ночей <span className="star">*</span>
                        </label>
                        <input
                          type="number"
                          className="admin_input"
                          name="tour_nights"
                          value={variant.tour_nights}
                          onChange={(e) => handleTourVariantChange(index, e)}
                          required
                        />
                      </div>
                    </div>

                    <div className="divided_two_inputs">
                      <div className="form_group">
                        <label>
                          Цена <span className="star">*</span>
                        </label>
                        <input
                          type="number"
                          className="admin_input"
                          name="tour_price"
                          value={variant.tour_price}
                          onChange={(e) => handleTourVariantChange(index, e)}
                          required
                        />
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
                    onClick={() => copyTourVariant(index)}
                  >
                    Скопировать вариант
                  </button>
                  <button
                    type="button"
                    className="delete_tour"
                    onClick={() => removeTourVariant(index)}
                  >
                    Удалить вариант
                  </button>
                </div>
              </div>
            ))}
          </div>

          <div className="create_tour_variant_btn">
            <div className="input_file_wrapper" onClick={() => addTourVariant()}>
              + Нажмите, чтобы добавить вариант тура
            </div>
          </div>

          <button className="blue_btn" onClick={handleSubmit} disabled={loading}>
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

export default AdminPanelEditTourPackage;
