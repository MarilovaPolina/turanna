import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import TextEditor from '../../../common/TextEditor/TextEditor';
import { createArticle, resetSuccess } from '../../../../store/articlesSlice';

import uploadImageIcon from "../../../../assets/img/icons/upload_image.png"

const AdminPanelCreateArticle = () => {
  const [data, setData] = React.useState(() => ({
    time: new Date().getTime(),
    blocks: [],
  }));
  const [title, setTitle] = React.useState('');
  const dispatch = useDispatch();
  const { loading, error, success } = useSelector((state) => state.article);
  const [inputsError, setInputsError] = React.useState('');
  const [mainImage, setMainImage] = React.useState(null);
  const [imageError, setImageError] = React.useState('');

  const hasContent = (blocks) => {
    if (!blocks || blocks.length === 0) return false;

    return blocks.some((block) => {
      if (block.type === 'paragraph' || block.type === 'header') {
        return block.data?.text?.trim().length > 0;
      }
      if (block.type === 'image') {
        return block.data?.file?.url;
      }
      return true;
    });
  };

  React.useEffect(() => {
    return () => {
      dispatch(resetSuccess());
    };
  }, [dispatch]);

  React.useEffect(() => {
    if (title.trim().length > 0 && hasContent(data.blocks)) {
      setInputsError('');
    }
  }, [title, data]);

  const mainImageChange = (e) => {
    const file = e.target.files[0];
  
    if (file && file.size > 8 * 1024 * 1024) { 
      setImageError('Размер главного изображения слишком большой. Максимальный размер файла — 8 МБ.');
      setMainImage(null);
    } else {
      setImageError('');
      setMainImage(file);
    }
  };

  const handleSave = (e) => {
    e.preventDefault();

    if (title.trim().length === 0 || !hasContent(data.blocks)) {
      setInputsError('Поля не должны быть пустыми');
      return;
    }
    
    setInputsError('');
    
    const formData = new FormData();
    formData.append('title', title);
    formData.append('content', JSON.stringify(data));
    formData.append('main_image', mainImage);

    dispatch(createArticle( formData ))
    .unwrap()
    .catch((error) => {
      if (error.includes('The main image must be a file of type: jpeg, png, jpg, svg.')) {
        setImageError('Недопустимый формат изображения. Разрешены только: JPEG, PNG, JPG, SVG. Возможно, файл потенциально небозопасен или поврежден. Попробуйте пересохранить изображение (напр. с помощью редактора фото)');
      } else {
        setInputsError(error); 
      }
    });
  };

  return (
    <div className="admin_panel_content">
      <div className="creation_heading">
        <p className="small_title_text">Добавить статью</p>
        <p className="creation_heading_subtitle">
          В статье вы можете поделиться актуальными новостями турагентства, новинках в мире туризма, 
          полезной информацией или лайфхаками для поездок, 
          рассказать истории из путешествий клиентов или об их отзывах. Регулярное обновление контента поможет удерживать 
          интерес пользователей и улучшит SEO-позиции сайта.
        </p>
      </div>

      <div className="form_container">
        <form onSubmit={handleSave}>
          <div className="form_group">
            <label htmlFor="article_title">Название статьи</label>
            <input
              type="text"
              className={`admin_input ${inputsError ? 'error_input' : ''}`}
              placeholder="Название (максимум 75 символов)"
              maxLength={75}
              name="article_title"
              required
              disabled={loading}
              value={title}
              onChange={(e) => setTitle(e.target.value)}
            />
          </div>

          <div className="main_image_input_wrapper">
            <label >Главное изображение:</label>
            <div className="input_file_wrapper">
            {mainImage 
                ? <img src={URL.createObjectURL(mainImage)} />
                : 
                <>
                    <img src={uploadImageIcon} />
                    <h3>Нажмите, чтобы выбрать фото</h3>
                </>
              }
              
              <input 
                onChange={mainImageChange}
                disabled={loading}
                type="file" 
                id="main_image" 
                name="main_image" 
                accept="image/png, image/jpeg, image/jpg, image/svg"
                required
              />
            </div>
          </div>

          <label>Содержание</label>
          <div className={`text_editor_wrapper ${inputsError ? 'error_input' : ''}`}>
            <div className="text_editor_content">
              <TextEditor data={data} onChange={setData} editorBlock="create-info-editor"  />
            </div>
          </div>

          <button className="blue_btn" type="submit" disabled={loading}>
            {loading ? 'Сохранение...' : 'Сохранить'}
          </button>

          <div className="message_info_block">
            {inputsError && <div className="error_msg">{inputsError}</div>}
            {error && <div className="error_msg">{error}</div>}
            {imageError && <p className="error_msg">{imageError}</p>}
            {success && (
              <div className="success_msg">
                <p>Новая статья успешно сохранена и опубликована.</p>
              </div>
            )}
          </div>
        </form>
      </div>
    </div>
  );
};

export default AdminPanelCreateArticle;