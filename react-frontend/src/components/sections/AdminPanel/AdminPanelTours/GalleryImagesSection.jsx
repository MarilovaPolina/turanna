import React from 'react';
import uploadImageIcon from '../../../../assets/img/icons/upload_image.png';

const GalleryImagesSection = ({ formData, handleGalleryImagesChange }) => (
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
);

export default GalleryImagesSection;
