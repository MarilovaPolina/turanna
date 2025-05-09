import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { createCertificate, resetSuccess } from '../../../../store/certificatesSlice';
import { useNavigate } from 'react-router-dom';

import uploadImageIcon from "../../../../assets/img/icons/upload_image.png"

const AdminPanelCreateCertificate = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { loading, error, success } = useSelector((state) => state.certificates);
  const [inputsError, setInputsError] = React.useState('');

  const [title, setTitle] = useState('');
  const [image, setImage] = useState(null);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!title || !image) {
        setInputsError('Пожалуйста, введите название сертификата и загрузите его изображение');
        return;
    } else{
        setInputsError("");
    }

    const formData = new FormData();
    formData.append('title', title);
    if (image) {
        formData.append('image', image);
    }

    try {
        await dispatch(createCertificate(formData))
        .unwrap()
        .catch((error) => {
            if (error.includes('The image must be a file of type: jpeg, png, jpg, svg.')) {
                setInputsError('Недопустимый формат изображения. Разрешены только: JPEG, PNG, JPG, SVG. Возможно, файл потенциально небозопасен или поврежден. Попробуйте пересохранить изображение (напр. с помощью редактора фото)');
            } else {
                setInputsError(error); 
            }
        });
    } catch (err) {
        console.error('Ошибка при создании сертификата', err);
    }
    console.log(success)
};

React.useEffect(() => {
    return () => {
      dispatch(resetSuccess());
    };
}, [dispatch]);

return (
  <div className="admin_panel_content">
    <div className="content_heading">
      <p className="small_title_text">Создание сертификата</p>
    </div>

    <form onSubmit={handleSubmit} className="form_container">
      <div className="form_group">
        <label htmlFor="title">Название</label>
        <input
          type="text"
          id="title"
          className="input_field"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          required
        />
      </div>

        <div className="main_image_input_wrapper">
            <label >Изображение сертификата:</label>
            <div className="input_file_wrapper">
                {image 
                ? <img src={URL.createObjectURL(image)} />
                : 
                <>
                    <img src={uploadImageIcon} className='upload_img_icon'/>
                    <h3>Нажмите, чтобы выбрать фото</h3>
                </>
                }
                
                <input 
                    disabled={loading}
                    type="file" 
                    id="image" 
                    name="image" 
                    accept="image/png, image/jpeg, image/jpg, image/svg"
                    onChange={(e) => setImage(e.target.files[0])}
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
                <p>Новая справочная информация успешно сохранена и опубликована.</p>
              </div>
            )}
        </div>
    </form>
  </div>
);
};

export default AdminPanelCreateCertificate;
