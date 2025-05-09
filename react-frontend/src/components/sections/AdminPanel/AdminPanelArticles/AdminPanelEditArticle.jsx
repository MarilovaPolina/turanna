import React from 'react';
import { useParams } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import TextEditor from '../../../common/TextEditor/TextEditor';
import { updateArticle, resetSuccess } from '../../../../store/articlesSlice';

const AdminPanelEditArticle = () => {
  const dispatch = useDispatch();
  const { id } = useParams();

  const editorRef = React.useRef(null);
  const { loading, error, success, articles } = useSelector((state) => state.article);

  const [title, setTitle] = React.useState('');
  const [data, setData] = React.useState(null);
  const [mainImage, setMainImage] = React.useState(null);
  const [previewImageUrl, setPreviewImageUrl] = React.useState(null);
  const [inputsError, setInputsError] = React.useState('');
  const [imageError, setImageError] = React.useState('');

  React.useEffect(() => {
    if (articles.length === 0) return;

    const article = articles.find(item => item.id === parseInt(id));
    if (article) {
      setTitle(article.title);

      const parsedContent = typeof article.content === 'string'
        ? JSON.parse(article.content)
        : article.content;
      setData(parsedContent);
      setPreviewImageUrl(article.main_image || null);
    }
  }, [id, articles]);

  React.useEffect(() => {
    return () => {
      dispatch(resetSuccess());
    };
  }, [dispatch]);

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
    if (title.trim().length > 0 && data?.blocks && hasContent(data.blocks)) {
      setInputsError('');
    }
  }, [title, data]);

  const handleImageChange = (e) => {
    const file = e.target.files[0];

    if (file && file.size > 8 * 1024 * 1024) {
      setImageError('Размер изображения слишком большой. Максимум 8 МБ.');
      setMainImage(null);
      return;
    }

    setImageError('');
    setMainImage(file);
    setPreviewImageUrl(URL.createObjectURL(file));
  };

  const handleSave = (e) => {
    e.preventDefault();

    if (!title.trim() || !data?.blocks || !hasContent(data.blocks)) {
      setInputsError('Поля не должны быть пустыми');
      return;
    }

    const formData = new FormData();
    formData.append('title', title);
    formData.append('content', JSON.stringify(data));
    if (mainImage) formData.append('main_image', mainImage);

    dispatch(updateArticle({
      articleId: id,
      title,
      content: JSON.stringify(data),
      main_image: mainImage || undefined,
    })).unwrap()
      .catch((error) => {
        if (error.includes('The main image must be a file of type')) {
          setImageError('Недопустимый формат изображения. JPEG, PNG, JPG, SVG. Возможно, файл потенциально небозопасен или поврежден. Попробуйте пересохранить изображение (напр. с помощью редактора фото)');
        } else {
          setInputsError(error);
        }
      });
  };

  return (
    <div className="admin_panel_content">
      <div className="creation_heading">
        <p className="small_title_text">Редактировать статью</p>
        <p className="creation_heading_subtitle">
          Обновите название, содержание и изображение статьи. Актуальность и качество контента —
          залог интереса пользователей.
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
            <label>Главное изображение:</label>
            <div className="input_file_wrapper">
              {previewImageUrl 
              ? <img src={previewImageUrl} alt="Превью" />
              : 
              <>
                <img src={uploadImage} />
                <h3>Нажмите, чтобы выбрать фото</h3>
              </>
              }
              <input
                onChange={handleImageChange}
                disabled={loading}
                type="file"
                id="main_image"
                name="main_image"
                accept="image/png, image/jpeg, image/jpg, image/svg"
              />
            </div>
          </div>

          <label>Содержание</label>
          <div className={`text_editor_wrapper ${inputsError ? 'error_input' : ''}`}>
            <div className="text_editor_content">
              {data && (
                <TextEditor
                  data={data}
                  onChange={setData}
                  editorBlock="edit-article-editor"
                  editorRef={editorRef}
                />
              )}
            </div>
          </div>

          <button className="blue_btn" type="submit" disabled={loading}>
            {loading ? 'Сохранение...' : 'Сохранить'}
          </button>

          <div className="message_info_block">
            {inputsError && <div className="error_msg">{inputsError}</div>}
            {error && <div className="error_msg">{error}</div>}
            {imageError && <div className="error_msg">{imageError}</div>}
            {success && (
              <div className="success_msg">
                <p>Статья успешно обновлена и опубликована.</p>
              </div>
            )}
          </div>
        </form>
      </div>
    </div>
  );
};

export default AdminPanelEditArticle;
