import React from "react";

import EditorContentArticle from "../../../common/TextEditor/EditorContentArticle";

function ArticleText({content}){
    let parsedContent;

    try {
        parsedContent = typeof content === "string" ? JSON.parse(content) : content;
    } catch (error) {
        console.error("Ошибка при загрузке статьи:", error);
        parsedContent = { blocks: [] };
    }

    return(
        <div className="editor-content-preview">
           <EditorContentArticle content={parsedContent} />
        </div>
    );
}

export default ArticleText;