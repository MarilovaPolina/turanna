import React from 'react';
import EditorJS from '@editorjs/editorjs';
import ImageTool from '@editorjs/image';
import { useSelector } from 'react-redux';

const TextEditor = ({ data, onChange, editorBlock }) => {
  const ref = React.useRef();
  const auth = useSelector((state) => state.auth);

  React.useEffect(() => {
    if (!ref.current) {
      const CustomImageTool = class extends ImageTool {
        static get pasteConfig() {
          return {
            patterns: [],
            tags: [],
            files: [],
          };
        }
      };

      const editor = new EditorJS({
        holder: editorBlock,
        data: data,
        tools: {
          image: {
            class: CustomImageTool,
            config: {
              endpoints: {
                byFile: 'http://localhost:8000/api/upload-image',
              },
              additionalRequestHeaders: {
                Authorization: `Bearer ${auth.token}`,
              },
            },
          },
        },
        async onChange(api) {
          const newData = await api.saver.save();
          onChange(newData);
        },
      });

      ref.current = editor;
    }

    return () => {
      if (ref.current && typeof ref.current.destroy === 'function') {
        ref.current.destroy();
        ref.current = null;
      }
    };
  }, [editorBlock, auth.token]);

  return <div id={editorBlock}></div>;
};

export default React.memo(TextEditor);
