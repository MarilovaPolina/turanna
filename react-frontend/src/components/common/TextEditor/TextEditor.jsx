import React from 'react'
import EditorJS from '@editorjs/editorjs'
import { EDITOR_JS_TOOLS } from './Tool';

const TextEditor = ({data, onChange, editorBlock}) => {
    const ref = React.useRef();

    React.useEffect(() => {
        if(!ref.current){
            const editor = new EditorJS({
                holder: editorBlock,
                data: data,
                tools: EDITOR_JS_TOOLS,
                async onChange(api, event){
                    const data = await api.saver.save();
                    onChange(data);
                }
            })
            ref.current = editor;
        }
        return () => {
            if(ref.current && ref.current.destroy){
                ref.current.destroy()
            }
        }
    }, [])
    return <div id={editorBlock}></div>
}

export default React.memo(TextEditor);
