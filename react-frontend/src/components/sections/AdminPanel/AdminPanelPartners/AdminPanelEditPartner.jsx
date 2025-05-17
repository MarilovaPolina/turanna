import React, { useState, useEffect } from 'react'; 
import { useDispatch, useSelector } from 'react-redux';
import { updatePartner, fetchPartner, resetSuccess } from '../../../../store/partnersSlice';
import { useParams } from 'react-router-dom';

import uploadImageIcon from "../../../../assets/img/icons/upload_image.png"

const AdminPanelEditPartner = () => {
  const dispatch = useDispatch();
  const { id } = useParams();

  const { loading, error, success, currentPartner } = useSelector(state => state.partners);

  const [inputsError, setInputsError] = useState('');
  const [name, setName] = useState('');
  const [link, setLink] = useState('');
  const [logo, setLogo] = useState(null);
  const [existingLogoUrl, setExistingLogoUrl] = useState('');

  useEffect(() => {
    dispatch(fetchPartner(id));
  }, [dispatch, id]);

  useEffect(() => {
    if (currentPartner) {
      setName(currentPartner.name || '');
      setLink(currentPartner.link || '');
      setExistingLogoUrl(
        currentPartner.logo
          ? `http://localhost:8000${currentPartner.logo}`
          : ''
      );
      console.log(existingLogoUrl)
    }
  }, [currentPartner]);

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!name) {
      setInputsError('Пожалуйста, введите название партнера');
      return;
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
      await dispatch(updatePartner({ partnerId: id, formData })).unwrap();
    } catch (error) {
      if (error.includes('The image must be a file of type: jpeg, png, jpg, svg.')) {
        setInputsError('Недопустимый формат изображения. Разрешены только: JPEG, PNG, JPG, SVG.');
      } else {
        setInputsError(error || 'Ошибка при сохранении. Попробуйте еще раз.');
      }
    }
  };

  useEffect(() => {
    if (success) {
      dispatch(resetSuccess());
    }
  }, [dispatch]);

  return (
    <div className="admin_panel_content">
      <div className="content_heading">
        <p className="small_name_text">Редактирование партнера</p>
      </div>

      <form onSubmit={handleSubmit} className="form_container">
        <div className="form_group">
          <label htmlFor="name">Название компании</label>
          <input
            type="text"
            id="name"
            className="input_field"
            value={name}
            onChange={e => setName(e.target.value)}
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
            onChange={e => setLink(e.target.value)}
          />
        </div>

        <div className="main_image_input_wrapper">
          <label>Изображение партнера:</label>
          <div className="input_file_wrapper">
            {logo ? (
              <img src={URL.createObjectURL(logo)} />
            ) : existingLogoUrl ? (
              <img src={existingLogoUrl} />
            ) : (
              <>
                <img src={uploadImageIcon} className="upload_img_icon" />
                <h3>Нажмите, чтобы выбрать фото</h3>
              </>
            )}
            <input
              disabled={loading}
              type="file"
              accept="image/png, image/jpeg, image/jpg, image/svg"
              onChange={e => {
                if (e.target.files.length > 0) {
                  setLogo(e.target.files[0]);
                }
              }}
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

export default AdminPanelEditPartner;
