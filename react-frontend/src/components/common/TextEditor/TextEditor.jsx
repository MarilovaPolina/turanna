import React from 'react';
import EditorJS from '@editorjs/editorjs';
import { useSelector } from 'react-redux';
import { EDITOR_JS_TOOLS } from './Tool';

const TextEditor = ({ data, onChange, editorBlock }) => {
  const ref = React.useRef();
  const auth = useSelector((state) => state.auth);

  React.useEffect(() => {
    if (!ref.current) {
      const toolsWithAuth = {
        ...EDITOR_JS_TOOLS,
        image: {
          ...EDITOR_JS_TOOLS.image,
          config: {
            ...EDITOR_JS_TOOLS.image.config,
            additionalRequestHeaders: {
              Authorization: `Bearer ${auth.token}`,
            }
          }
        }
      };

      const editor = new EditorJS({
        holder: editorBlock,
        data,
        tools: toolsWithAuth,

        i18n: {
            messages: {
              toolNames: {
                Text: "Текст",
                Heading: "Заголовок",
                List: "Список",
                Checklist: "Чек-лист",
                Delimiter: "Разделитель",
                Image: "Изображение",
                Quote: "Цитата",
                Code: "Код",
                "Ordered List": "Нумерованный список",
                "Unordered List": "Ненумерованный список",
              },
              tools: {
                List: {
                  Unordered: "Маркированный",
                  Ordered: "Нумерованный",
                  Checklist: "Чек-лист",
                },
                Header: {
                  'Header 1': 'Заголовок 1',
                  'Header 2': 'Заголовок 2',
                  'Header 3': 'Заголовок 3',
                },
                Image: {
                  'Select an Image': 'Выберите изображение',
                  'Upload a file': 'Загрузить файл',
                  'Paste an image URL': 'Вставьте URL изображения',
                },
              },
              blockTunes: {
                delete: "Удалить",
                moveUp: "Переместить вверх",
                moveDown: "Переместить вниз",
              },
              ui: {
                blockTunes: {
                  toggler: {
                    'Click to tune': 'Настроить блок',
                    'or drag to move': 'или перетащить',
                  },
                },
                inlineToolbar: {
                  converter: {
                    'Convert to': 'Преобразовать в',
                  },
                },
              },
              messages: {
                'This block can not be moved up': 'Этот блок нельзя переместить вверх',
                'This block can not be moved down': 'Этот блок нельзя переместить вниз',
              },
            },
        },

        async onChange(api) {
          const newData = await api.saver.save();
          onChange(newData);
        }
      });

      ref.current = editor;
    }

    return () => {
      if (ref.current?.destroy) {
        ref.current.destroy();
        ref.current = null;
      }
    };
  }, [editorBlock, auth.token]);

  return <div id={editorBlock}></div>;
};

export default React.memo(TextEditor);
