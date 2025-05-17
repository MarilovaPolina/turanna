import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { createPartner, resetSuccess } from '../../../../store/partnersSlice';
import { useNavigate } from 'react-router-dom';

import uploadImageIcon from "../../../../assets/img/icons/upload_image.png"

const AdminPanelCreatePartner = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { loading, error, success } = useSelector((state) => state.partners);
  const [inputsError, setInputsError] = useState('');

  const [name, setName] = useState('');
  const [link, setLink] = useState('');
  const [logo, setLogo] = useState(null);

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!name || !logo) {
      setInputsError('Пожалуйста, введите название партнера и загрузите его изображение');
      return;
    } else {
      setInputsError('');
    }

    const formData = new FormData();
    formData.append('name', name);
    if (link.trim()) {
      formData.append('link', link.trim());
    }
    if (logo) {
      formData.append('logo', logo);
    }

    try {
      await dispatch(createPartner(formData))
        .unwrap()
        .catch((error) => {
          if (error.includes('The image must be a file of type: jpeg, png, jpg, svg.')) {
            setInputsError('Недопустимый формат изображения. Разрешены только: JPEG, PNG, JPG, SVG. Возможно, файл потенциально небезопасен или поврежден. Попробуйте пересохранить изображение (напр. с помощью редактора фото)');
          } else {
            setInputsError(error || 'Ошибка при сохранении. Попробуйте изменить данные и сохранить еще раз.');
          }
        });
    } catch (err) {
      console.error('Ошибка при создании партнера', err);
    }
  };

  useEffect(() => {
    return () => {
      dispatch(resetSuccess());
    };
  }, [dispatch]);

  return (
    <div className="admin_panel_content">
      <div className="content_heading">
        <p className="small_name_text">Создание партнера</p>
      </div>

      <form onSubmit={handleSubmit} className="form_container">
        <div className="form_group">
          <label htmlFor="name">Название компании</label>
          <input
            type="text"
            id="name"
            className="input_field"
            value={name}
            onChange={(e) => setName(e.target.value)}
            required
          />
        </div>

        <div className="form_group">
          <label htmlFor="link">Ссылка на партнера</label>
          <input
            type="text"
            id="link"
            className="input_field"
            value={link}
            onChange={(e) => setLink(e.target.value)}
          />
        </div>

        <div className="main_image_input_wrapper">
          <label>Изображение партнера:</label>
          <div className="input_file_wrapper">
            {logo ? (
              <img src={URL.createObjectURL(logo)} alt="preview" />
            ) : (
              <>
                <img src={uploadImageIcon} className="upload_img_icon" />
                <h3>Нажмите, чтобы выбрать фото</h3>
              </>
            )}

            <input
              disabled={loading}
              type="file"
              id="image"
              name="image"
              accept="image/png, image/jpeg, image/jpg, image/svg"
              onChange={(e) => setLogo(e.target.files[0])}
              required
            />
          </div>
        </div>

        <button type="submit" className="blue_btn" disabled={loading}>
          {loading ? 'Сохранение...' : 'Сохранить'}
        </button>

        <div className="message_info_block">
          {inputsError && <div className="error_msg">{inputsError}</div>}
          {error && <div className="error_msg">{error}</div>}
          {success && (
            <div className="success_msg">
              <p>Новый партнер успешно сохранен и опубликован.</p>
            </div>
          )}
        </div>
      </form>
    </div>
  );
};

export default AdminPanelCreatePartner;
