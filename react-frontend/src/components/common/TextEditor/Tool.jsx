import ImageTool from '@editorjs/image';

export const EDITOR_JS_TOOLS = {
    image: {
        class: ImageTool,
        config: {
            endpoints: {
                byFile: 'http://localhost:8000/api/upload-image',
                byUrl: 'http://localhost:8000/api/fetch-image'
            }
        }
    }
}