import React, { useState } from 'react';

const TourPackageDescriptionSection = ({ formData, handleInputChange, onValidate }) => {
  const [errors, setErrors] = useState({});

  const validateForm = () => {
    const newErrors = {};
    if (!formData.package_name) newErrors.package_name = 'Обязательное поле';
    if (!formData.departure_city) newErrors.departure_city = 'Обязательное поле';
    if (!formData.arrival_city) newErrors.arrival_city = 'Обязательное поле';
    if (!formData.description) newErrors.description = 'Обязательное поле';

    setErrors(newErrors);
    onValidate(Object.keys(newErrors).length === 0, newErrors);
  };

  return (
    <div className="admin_panel_content">
      <div className="form_container">
        <form onSubmit={(e) => { e.preventDefault(); validateForm(); }}>
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
            />
            {errors.package_name && <span className="error_text">{errors.package_name}</span>}
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
            />
            {errors.departure_city && <span className="error_text">{errors.departure_city}</span>}
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
            />
            {errors.arrival_city && <span className="error_text">{errors.arrival_city}</span>}
          </div>

          <div className="form_group">
            <label htmlFor="description">Описание</label>
            <input
              type="text"
              className={`admin_input ${errors.description ? 'error_input' : ''}`}
              placeholder="Описание"
              name="description"
              value={formData.description}
              onChange={handleInputChange}
            />
            {errors.description && <span className="error_text">{errors.description}</span>}
          </div>

          <button type="button" onClick={validateForm}>Проверить форму</button>
        </form>
      </div>
    </div>
  );
};

export default TourPackageDescriptionSection;
