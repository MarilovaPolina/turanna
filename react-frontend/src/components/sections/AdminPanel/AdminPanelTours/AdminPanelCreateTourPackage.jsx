import React from 'react';
import { useDispatch } from 'react-redux';
import bedIcon from '../../../../assets/img/icons/bed.png';
import uploadImageIcon from '../../../../assets/img/icons/upload_image.png';
import TextEditor from '../../../common/TextEditor/TextEditor';
import { createTourPackage } from '../../../../store/tourPackagesSlice';

const AdminPanelCreateTourPackage = () => {
  const dispatch = useDispatch();
  const [formData, setFormData] = React.useState({
    package_name: '',
    departure_city: '',
    arrival_city: '',
    description: '',
    galleryImages: [],
    tourVariants: [
      {
        hotel_image: null,
        hotel_name: '',
        departure_city: '',
        arrival_city: '',
        tour_start: '',
        tour_finish: '',
        tour_nights: '',
        tour_price: '',
        price_type: 'per_person',
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
        image_text_copyright: '',
        image_link_copyright: '',
        tour_category: '',
        article_number: '',
      },
    ],
  });

  const [errors, setErrors] = React.useState({});
  const [imageErrors, setImageErrors] = React.useState("");

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const [descriptionData, setDescriptionData] = React.useState({
    time: new Date().getTime(),
    blocks: [],
  });

  const handleGalleryImagesChange = (e) => {
    const files = Array.from(e.target.files);
    const newImages = files.map((file) => ({
      file,
      preview: URL.createObjectURL(file),
    }));
    setFormData({
      ...formData,
      galleryImages: [...formData.galleryImages, ...newImages],
    });
  };

  const handleTourVariantChange = (index, e) => {
    const { name, value } = e.target;
    const updatedVariants = [...formData.tourVariants];
    updatedVariants[index][name.replace(`_${index}`, '')] = value;
    setFormData({ ...formData, tourVariants: updatedVariants });
  };

  const handleHotelImageChange = (index, e) => {
    const file = e.target.files[0];
    const updatedVariants = [...formData.tourVariants];
    updatedVariants[index].hotel_image = {
      file,
      preview: URL.createObjectURL(file),
    };
    setFormData({ ...formData, tourVariants: updatedVariants });
  };

  const addTourVariant = () => {
    setFormData({
      ...formData,
      tourVariants: [
        ...formData.tourVariants,
        {
          hotel_image: null,
          hotel_name: '',
          departure_city: '',
          arrival_city: '',
          tour_start: '',
          tour_finish: '',
          tour_nights: '',
          tour_price: '',
          price_type: 'per_person',
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
          image_text_copyright: '',
          image_link_copyright: '',
          tour_category: '',
          article_number: '',
        },
      ],
    });
  };

  const validateForm = () => {
    const newErrors = {};
    let imageErrorMessage = "";
  
    if (!formData.package_name) newErrors.package_name = 'Обязательное поле';
    if (!formData.departure_city) newErrors.departure_city = 'Обязательное поле';
    if (!formData.arrival_city) newErrors.arrival_city = 'Обязательное поле';
  
    if (formData.galleryImages.length < 1) {
      imageErrorMessage = "Добавьте хотя бы 1 фото в галерею изображений.";
    }
  
    formData.tourVariants.forEach((variant, index) => {
      if (!variant.hotel_name) newErrors[`hotel_name_${index}`] = 'Обязательное поле';
      if (!variant.tour_start) newErrors[`tour_start_${index}`] = 'Обязательное поле';
      if (!variant.tour_finish) newErrors[`tour_finish_${index}`] = 'Обязательное поле';
      if (!variant.tour_nights) newErrors[`tour_nights_${index}`] = 'Обязательное поле';
      if (variant.tour_nights<0) newErrors[`tour_nights_${index}`] = 'Количество ночей не может быть меньше ноля';
      if (!variant.tour_price) newErrors[`tour_price_${index}`] = 'Обязательное поле';
      if (variant.tour_price<0) newErrors[`tour_price_${index}`] = 'Цена тура не может быть меньше ноля';
      if (!variant.tour_category) newErrors[`tour_category_${index}`] = 'Обязательное поле';
      if (!variant.hotel_image) {
        imageErrorMessage = "Добавьте фото отеля к каждому варианту тура.";
      }

      if (variant.tour_start && variant.tour_finish) {
        const startDate = new Date(variant.tour_start);
        const finishDate = new Date(variant.tour_finish);
      
        if (finishDate <= startDate) {
          newErrors[`tour_finish_${index}`] = 'Дата окончания должна быть позже даты начала';
        }
      }
    });
  
    setErrors(newErrors);
    setImageErrors(imageErrorMessage);
  
    return Object.keys(newErrors).length === 0 && !imageErrorMessage;
  };

  const copyTourVariant = (index) => {
    const variantToCopy = formData.tourVariants[index];
    setFormData({
      ...formData,
      tourVariants: [...formData.tourVariants, { ...variantToCopy }],
    });
  };

  const removeTourVariant = (index) => {
    const updatedVariants = formData.tourVariants.filter((_, i) => i !== index);
    setFormData({
      ...formData,
      tourVariants: updatedVariants,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setErrors({});
    setImageErrors("");

    const isValid = validateForm();
    if (isValid) {
      const formDataWithDescription = {
        ...formData,
        description: JSON.stringify(descriptionData),
      };
      console.log('Форма отправлена', formDataWithDescription);
      dispatch(createTourPackage(formDataWithDescription));
    }
    else{
      setImageErrors("В полях есть ошибки. Исправьте ошибки и попробуйте сохранить еще раз.")
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
              Название подборки <span className="star">*</span>
            </label>
            <input
              type="text"
              className={`admin_input ${errors.package_name ? 'error_input' : ''}`}
              placeholder="Напр. туристическое направление или название отеля (до 40 символов)"
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

            {formData.tourVariants.map((variant, index) => (
              <div className="tour_creation_wrapper" key={index}>
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

                    <div className="divided_two_inputs">
                      <div className="form_group">
                        <label htmlFor={`departure_city_${index}`}>
                          Город отправления 
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
                        />
                        {errors[`variant_departure_city_${index}`] && (
                          <span className="error_msg">
                            {errors[`variant_departure_city_${index}`]}
                          </span>
                        )}
                      </div>
                      <div className="form_group">
                        <label htmlFor={`arrival_city_${index}`}>
                          Город прибытия 
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
                        />
                        {errors[`variant_arrival_city_${index}`] && (
                          <span className="error_msg">
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
                    <div className="divided_three_inputs">
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

                <div className="tour_creation_details">
                  <p className="substring">*Ненужные поля оставьте пустыми</p>
                  <div className="details_inputs_wrapper">
                    <div className="form_group">
                      <label htmlFor={`room_class_${index}`}>
                        <img src={bedIcon} alt="Кровать" />
                        Класс номера
                      </label>
                      <input
                        type="text"
                        className="admin_input"
                        name="room_class"
                        value={variant.room_class}
                        onChange={(e) => handleTourVariantChange(index, e)}
                        maxLength="35"
                      />
                    </div>

                    <div className="form_group">
                      <label htmlFor={`age_limit_${index}`}>
                        <img src={bedIcon} alt="Кровать" />
                        Возрастное ограничение
                      </label>
                      <input
                        type="text"
                        className="admin_input"
                        name="age_limit"
                        value={variant.age_limit}
                        onChange={(e) => handleTourVariantChange(index, e)}
                        maxLength="35"
                      />
                    </div>

                    <div className="form_group">
                      <label htmlFor={`all_inclusive_${index}`}>
                        <img src={bedIcon} alt="Кровать" />
                        Все включено
                      </label>
                      <select
                        className="admin_input"
                        name="all_inclusive"
                        value={variant.all_inclusive}
                        onChange={(e) => handleTourVariantChange(index, e)}
                      >
                        <option value=""></option>
                        <option value="yes">есть</option>
                        <option value="no">нет</option>
                      </select>
                    </div>

                    <div className="form_group">
                      <label htmlFor={`hotel_link_${index}`}>
                        <img src={bedIcon} alt="Кровать" />
                        Ссылка на отель
                      </label>
                      <input
                        type="text"
                        className="admin_input"
                        name="hotel_link"
                        value={variant.hotel_link}
                        onChange={(e) => handleTourVariantChange(index, e)}
                      />
                    </div>

                    <div className="form_group">
                      <label htmlFor={`distance_center_${index}`}>
                        <img src={bedIcon} alt="Кровать" />
                        Расст. до центра
                      </label>
                      <input
                        type="text"
                        className="admin_input"
                        name="distance_center"
                        value={variant.distance_center}
                        onChange={(e) => handleTourVariantChange(index, e)}
                        maxLength="35"
                      />
                    </div>

                    <div className="form_group">
                      <label htmlFor={`distance_airport_${index}`}>
                        <img src={bedIcon} alt="Кровать" />
                        Расст. до аэропорта
                      </label>
                      <input
                        type="text"
                        className="admin_input"
                        name="distance_airport"
                        value={variant.distance_airport}
                        onChange={(e) => handleTourVariantChange(index, e)}
                        maxLength="35"
                      />
                    </div>

                    <div className="form_group">
                      <label htmlFor={`distance_lift_${index}`}>
                        <img src={bedIcon} alt="Кровать" />
                        Расст. до подъемника
                      </label>
                      <input
                        type="text"
                        className="admin_input"
                        name="distance_lift"
                        value={variant.distance_lift}
                        onChange={(e) => handleTourVariantChange(index, e)}
                        maxLength="35"
                      />
                    </div>

                    <div className="form_group">
                      <label htmlFor={`distance_nature_${index}`}>
                        <img src={bedIcon} alt="Кровать" />
                        Расст. до природ объекта
                      </label>
                      <input
                        type="text"
                        className="admin_input"
                        name="distance_nature"
                        value={variant.distance_nature}
                        onChange={(e) => handleTourVariantChange(index, e)}
                        maxLength="35"
                      />
                    </div>

                    <div className="form_group">
                      <label htmlFor={`distance_beach_${index}`}>
                        <img src={bedIcon} alt="Кровать" />
                        Расст. до пляжа
                      </label>
                      <input
                        type="text"
                        className="admin_input"
                        name="distance_beach"
                        value={variant.distance_beach}
                        onChange={(e) => handleTourVariantChange(index, e)}
                        maxLength="35"
                      />
                    </div>

                    <div className="form_group">
                      <label htmlFor={`beach_type_${index}`}>
                        <img src={bedIcon} alt="Кровать" />
                        Тип пляжа
                      </label>
                      <select
                        className="admin_input"
                        name="beach_type"
                        value={variant.beach_type}
                        onChange={(e) => handleTourVariantChange(index, e)}
                      >
                        <option value=""></option>
                        <option value="песчаный">песчаный</option>
                        <option value="галечный">галечный</option>
                        <option value="коралловый">коралловый</option>
                        <option value="искусственный">искусственный</option>
                        <option value="дикий">дикий</option>
                      </select>
                    </div>

                    <div className="form_group">
                      <label htmlFor={`childcare_${index}`}>
                        <img src={bedIcon} alt="Кровать" />
                        Няня для детей
                      </label>
                      <select
                        className="admin_input"
                        name="childcare"
                        value={variant.childcare}
                        onChange={(e) => handleTourVariantChange(index, e)}
                      >
                        <option value=""></option>
                        <option value="no">нет</option>
                        <option value="yes">есть</option>
                        <option value="yes_paid">есть (платно)</option>
                        <option value="yes_free">есть (бесплатно)</option>
                      </select>
                    </div>

                    <div className="form_group">
                      <label htmlFor={`pool_${index}`}>
                        <img src={bedIcon} alt="Кровать" />
                        Бассейн отеля
                      </label>
                      <select
                        className="admin_input"
                        name="pool"
                        value={variant.pool}
                        onChange={(e) => handleTourVariantChange(index, e)}
                      >
                        <option value=""></option>
                        <option value="yes">есть</option>
                        <option value="no">нет</option>
                      </select>
                    </div>

                    <div className="form_group">
                      <label htmlFor={`gym_${index}`}>
                        <img src={bedIcon} alt="Кровать" />
                        Тренажерный зал отеля
                      </label>
                      <select
                        className="admin_input"
                        name="gym"
                        value={variant.gym}
                        onChange={(e) => handleTourVariantChange(index, e)}
                      >
                        <option value=""></option>
                        <option value="yes">есть</option>
                        <option value="no">нет</option>
                      </select>
                    </div>

                    <div className="form_group">
                      <label htmlFor={`pets_allowed_${index}`}>
                        <img src={bedIcon} alt="Кровать" />
                        Животные
                      </label>
                      <select
                        className="admin_input"
                        name="pets_allowed"
                        value={variant.pets_allowed}
                        onChange={(e) => handleTourVariantChange(index, e)}
                      >
                        <option value=""></option>
                        <option value="no">нельзя</option>
                        <option value="yes">можно</option>
                      </select>
                    </div>

                    <div className="form_group">
                      <label htmlFor={`airline_${index}`}>
                        <img src={bedIcon} alt="Кровать" />
                        Авиакомпания
                      </label>
                      <input
                        type="text"
                        className="admin_input"
                        name="airline"
                        value={variant.airline}
                        onChange={(e) => handleTourVariantChange(index, e)}
                        maxLength="35"
                      />
                    </div>

                    <div className="form_group">
                      <label htmlFor={`visa_required_${index}`}>
                        <img src={bedIcon} alt="Кровать" />
                        Виза
                      </label>
                      <select
                        className="admin_input"
                        name="visa_required"
                        value={variant.visa_required}
                        onChange={(e) => handleTourVariantChange(index, e)}
                      >
                        <option value=""></option>
                        <option value="yes">Нужна</option>
                        <option value="no">Не нужна</option>
                      </select>
                    </div>
                  </div>
                </div>

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

            <div className="create_tour_variant_btn" >
              <div className="input_file_wrapper" onClick={addTourVariant}>
                + Нажмите, чтобы добавить вариант тура
              </div>
            </div>

          </div>

          <button className="blue_btn">Сохранить</button>

          <div className="message_info_block">
            {imageErrors && <div className="error_msg">{imageErrors}</div>}
            {/*
            {error && <div className="error_msg">{error}</div>}
            {imageError && <p className="error_msg">{imageError}</p>}
            {success && (
              <div className="success_msg">
                <p>Новая статья успешно сохранена и опубликована.</p>
              </div>
            )}
            */}
          </div>
        </form>
      </div>
    </div>
  );
};

export default AdminPanelCreateTourPackage;
