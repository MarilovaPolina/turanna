import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { createTourPackage } from '../../../../store/tourPackageSlice';
import TourPackageDescriptionSection from './TourPackageDescriptionSection';
import GalleryImagesSection from './GalleryImagesSection';
import TourVariantSection from './TourVariantSection';


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
        room_comfort: '',
        age_limit: '',
        all_inclusive: '',
        hotel_link: '',
        distance_to_center: '',
        distance_to_airport: '',
        distance_to_lift: '',
        distance_to_nature: '',
        distance_to_beach: '',
        beach_type: '',
        child_care: '',
        hotel_pool: '',
        hotel_gym: '',
        animals: '',
        airline: '',
        visa: '',
        image_text_copyright: '',
        image_link_copyright: '',
      },
    ],
  });

  const [errors, setErrors] = useState({
    description: {},
    galleryImages: '',
    tourVariants: [],
  });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

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

  const handleSubmit = (e) => {
    e.preventDefault();

    // Инициируем валидацию в дочерних компонентах
    const isDescriptionValid = validateDescription();
    const isGalleryValid = validateGallery();
    const isTourVariantsValid = validateTourVariants();

    if (isDescriptionValid && isGalleryValid && isTourVariantsValid) {
      // Отправляем форму
      dispatch(createTourPackage(formData));
    }
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
          room_comfort: '',
          age_limit: '',
          all_inclusive: '',
          hotel_link: '',
          distance_to_center: '',
          distance_to_airport: '',
          distance_to_lift: '',
          distance_to_nature: '',
          distance_to_beach: '',
          beach_type: '',
          child_care: '',
          hotel_pool: '',
          hotel_gym: '',
          animals: '',
          airline: '',
          visa: '',
          image_text_copyright: '',
          image_link_copyright: '',
        },
      ],
    });
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
}

  const handleDescriptionValidation = (isValid, validationErrors) => {
    setErrors((prevErrors) => ({
      ...prevErrors,
      description: validationErrors,
    }));
  };

  return (
    <div className="admin_panel_content">
      <div className="creation_heading">
        <p className="small_title_text">Создать подборку туров</p>
        <p className="creation_heading_subtitle">...</p>
      </div>
      <div className="form_container">
        <form onSubmit={handleSubmit}>
          <TourPackageDescriptionSection
            formData={formData}
            handleInputChange={handleInputChange}
            onValidate={handleDescriptionValidation}
          />
          <GalleryImagesSection formData={formData} handleGalleryImagesChange={handleGalleryImagesChange} />
          {/*
          <TourVariantDetailsSection
            formData={formData}
            handleTourVariantChange={handleTourVariantChange}
            handleHotelImageChange={handleHotelImageChange}
            errors={errors}
            addTourVariant={addTourVariant}
            copyTourVariant={copyTourVariant}
            removeTourVariant={removeTourVariant}
          />
          */}
         {formData.tourVariants.map((variant, index) => (
          <TourVariantSection
            key={index}
            variant={variant}
            index={index}
            handleTourVariantChange={handleTourVariantChange}
            handleHotelImageChange={handleHotelImageChange}
            //errors={tourVariantErrors[index] || {}}
          />
        ))}
          <button type="submit">Создать подборку</button>

          <div className="message_info_block">
            {Object.keys(errors.description).length > 0 && (
              <div className="error_msg">
                {Object.values(errors.description).map((error, index) => (
                  <p key={index}>{error}</p>
                ))}
              </div>
            )}
            {/* Вы можете добавить и другие блоки ошибок, если они есть */}
          </div>
        </form>
      </div>
    </div>
  );
};

export default AdminPanelCreateTourPackage;
