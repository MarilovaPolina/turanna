import ImageTool from '@editorjs/image';
import Header from '@editorjs/header';
import EditorjsList from '@editorjs/list';

export const EDITOR_JS_TOOLS = {
    image: {
        class: ImageTool,
        config: {
            endpoints: {
                byFile: 'http://localhost:8000/api/upload-image',
            },
            captionPlaceholder: "Фото от: Имя Фамилия",
            features: {
                caption: true,
                border: false,
                background: false,
                stretch: false,
            },
        },
    },

    header: {
        class: Header,
        config: {
            placeholder: 'Введите подзаголовок',
            levels: [1],
            defaultLevel: 1
        }
    },

    list: {
        class: EditorjsList,
        inlineToolbar: true,
        config: {
          defaultStyle: 'unordered',
          counterTypes: 'numeric'
        },
    },
}