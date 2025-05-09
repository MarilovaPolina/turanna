import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { updateCertificate, resetSuccess } from '../../../../store/certificatesSlice';
import { useNavigate, useParams } from 'react-router-dom';
import uploadImageIcon from '../../../../assets/img/icons/upload_image.png';

const AdminPanelEditCertificate = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { id } = useParams();
  const { certificates, loading, error, success } = useSelector((state) => state.certificates);

  const [inputsError, setInputsError] = useState('');
  const [title, setTitle] = useState('');
  const [image, setImage] = useState(null);
  const [previewImage, setPreviewImage] = useState('');

  useEffect(() => {
    const certificate = certificates.find((c) => c.id === parseInt(id));
    if (certificate) {
      setTitle(certificate.title);
      setPreviewImage(certificate.image);
      console.log(certificate.image)
    }
  }, [certificates, id]);

  useEffect(() => {
    return () => {
      dispatch(resetSuccess());
    };
  }, [dispatch]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!title) {
      setInputsError('Пожалуйста, введите название сертификата');
      return;
    }

    setInputsError('');
    const formData = new FormData();
    formData.append('title', title);
    if (image) {
      formData.append('image', image);
    }

    try {
      await dispatch(updateCertificate({ certificateId: id, formData }))
        .unwrap()
        .catch((error) => {   
          if (error.includes('The image must be a file of type')) {
            setInputsError('Недопустимый формат изображения. JPEG, PNG, JPG, SVG. Возможно, файл потенциально небозопасен или поврежден. Попробуйте пересохранить изображение (напр. с помощью редактора фото)');
          } else {
            setInputsError(error);
          }
        });
    } catch (err) {
      console.error('Ошибка при обновлении сертификата', err);
    }
  };

  return (
    <div className="admin_panel_content">
      <div className="content_heading">
        <p className="small_title_text">Редактирование сертификата</p>
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
          <label>Изображение сертификата:</label>
          <div className="input_file_wrapper">
            {image ? (
               <img src={URL.createObjectURL(image)} />
            ) : previewImage ? (
              <img src={`http://localhost:8000${previewImage}`} alt="certificate" />
            ) : (
              <>
                <img src={uploadImageIcon} className="upload_img_icon" alt="upload" />
                <h3>Нажмите, чтобы выбрать фото</h3>
              </>
            )}

            <input
              disabled={loading}
              type="file"
              id="image"
              name="image"
              accept="image/png, image/jpeg, image/jpg, image/svg"
              onChange={(e) => setImage(e.target.files[0])}
            />
          </div>
        </div>

        <button type="submit" className="blue_btn">
          {loading ? 'Сохранение...' : 'Сохранить'}
        </button>

        <div className="message_info_block">
        {inputsError ? (
          <div className="error_msg">{inputsError}</div>
        ) : error ? (
          <div className="error_msg">{error}</div>
        ) : success ? (
          <div className="success_msg">
            <p>Сертификат успешно обновлен и опубликован.</p>
          </div>
        ) : null}
        </div>
      </form>
    </div>
  );
};

export default AdminPanelEditCertificate;
