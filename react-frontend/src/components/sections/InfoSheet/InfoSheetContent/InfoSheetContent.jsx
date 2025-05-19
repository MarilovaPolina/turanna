import React from "react";
import EditorContentArticle from "../../../common/TextEditor/EditorContentArticle";

function InfoSheetContent({ title, content }) {
  let parsedContent;
  try {
    parsedContent = typeof content === "string" ? JSON.parse(content) : content;
  } catch (error) {
    parsedContent = { blocks: [] };
    console.error("Error parsing content JSON:", error);
  }

  return (
    <div className="info_sheet_content">
      <div className="white_block info_sheet_title_block">
        <p className="title_text">{title}</p>
      </div>
      <div className="white_block content_text_block">
        <EditorContentArticle content={parsedContent} />
      </div>
    </div>
  );
}

export default InfoSheetContent;
