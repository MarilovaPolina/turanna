import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import TextEditor from '../../../common/TextEditor/TextEditor';
import { createInfoSheet } from '../../../../store/infoSheetSlice';

const INITIAL_DATA = {
  time: new Date().getTime(),
  blocks: [],
};

const AdminPanelCreateInfoSheet = () => {
  const [data, setData] = React.useState(INITIAL_DATA);
  const [title, setTitle] = React.useState('');
  const dispatch = useDispatch();
  const { loading, error, success } = useSelector((state) => state.infoSheet);
  const [inputsError, setInputsError] = React.useState('');

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
    if (title.trim().length > 0 && hasContent(data.blocks)) {
      setInputsError('');
    }
  }, [title, data]);

  const handleSave = (e) => {
    e.preventDefault();

    if (title.trim().length === 0 || !hasContent(data.blocks)) {
      setInputsError('Поля не должны быть пустыми');
      return;
    }

    setInputsError('');
    dispatch(createInfoSheet({ title, content: data }));
  };

  return (
    <div className="admin_panel_content">
      <div className="creation_heading">
        <p className="small_title_text">Добавить справочную информацию</p>
        <p className="creation_heading_subtitle">
          Справочная информация поможет клиентам разобраться в особенностях, услугах, процессах и
          правилах работы турагентства. Она всегда доступна в фиксированной шапке сайта.
        </p>
      </div>

      <div className="form_container">
        <form onSubmit={handleSave}>
          <div className="form_group">
            <label htmlFor="info_sheet_title">Заголовок справки</label>
            <input
              type="text"
              className={`admin_input ${inputsError ? 'error_input' : ''}`}
              placeholder="Заголовок (максимум 32 символа)"
              maxLength={32}
              name="info_sheet_title"
              required
              disabled={loading}
              value={title}
              onChange={(e) => setTitle(e.target.value)}
            />
          </div>

          <label htmlFor="info_sheet_title">Содержание</label>
          <div className={`info_sheet_editor_wrapper ${inputsError ? 'error_input' : ''}`}>
            <div className="info_sheet_editor_content">
              <TextEditor data={data} onChange={setData} editorBlock="editorjs-container" />
            </div>
          </div>

          <button className="blue_btn" type="submit" disabled={loading}>
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
    </div>
  );
};

export default AdminPanelCreateInfoSheet;
