import React from 'react'; 
import { useParams } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import TextEditor from '../../../common/TextEditor/TextEditor';
import { updateInfoSheet, resetSuccess } from '../../../../store/infoSheetSlice';

const AdminPanelEditInfoSheet = () => {
    const dispatch = useDispatch();
    const { id } = useParams();
    const editorRef = React.useRef(null);

    const { loading, error, success } = useSelector((state) => state.infoSheet);
    const infoSheets = useSelector(state => state.infoSheet.infoSheets);
    const [title, setTitle] = React.useState('');
    const [initialData, setInitialData] = React.useState(null);
    const [inputsError, setInputsError] = React.useState('');
    const [editorData, setEditorData] = React.useState(null); 

    React.useEffect(() => {
        if (infoSheets.length === 0) return;
    
        const sheet = infoSheets.find(item => item.id === parseInt(id));
        if (sheet) {
            setTitle(sheet.title);
    
            if (sheet.content) {
                const parsed = typeof sheet.content === 'string' ? JSON.parse(sheet.content) : sheet.content;
                if (parsed?.content?.blocks) {
                    setInitialData(parsed.content);
                    setEditorData(parsed.content); 
                }
            }
        }
    }, [id, infoSheets]);

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
        if (title.trim().length > 0 && initialData && hasContent(initialData.blocks)) {
            setInputsError('');
        }
    }, [title, initialData]);

    const handleSave = async (e) => {
        e.preventDefault();

        if (!title.trim()) {
            setInputsError('Заголовок обязателен');
            return;
        }

        try {
            const content = editorData;

            if (!content.blocks || content.blocks.length === 0) {
                setInputsError('Содержание не должно быть пустым');
                return;
            }

            setInputsError('');
            dispatch(updateInfoSheet({ infoSheetId: id, title, content }));
        } catch (err) {
            console.error('Ошибка при сохранении содержания справки: ', err);
            setInputsError('Ошибка при сохранении содержания справки');
        }
    };

    const handleEditorChange = (newData) => {
        setEditorData(newData); 
    };

    return (
        <div className="admin_panel_content">
            <div className="creation_heading">
                <p className="small_title_text">Редактировать справочную информацию</p>
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
                    <div className={`text_editor_wrapper ${inputsError ? 'error_input' : ''}`}>
                        <div className="text_editor_content">
                            <TextEditor 
                                data={initialData} 
                                editorBlock="editorjs-container" 
                                editorRef={editorRef} 
                                onChange={handleEditorChange} 
                            />
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

export default AdminPanelEditInfoSheet;
