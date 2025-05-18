import React from "react";
import Output from "editorjs-react-renderer";

function InfoSheetContent({ title, content }) {
  let parsedContent;
  try {
    parsedContent = typeof content === "string" ? JSON.parse(content) : content;
  } catch (error) {
    parsedContent = { blocks: [] };
    console.error("Error parsing content JSON:", error);
  }

  const dataForOutput = parsedContent.content || parsedContent;

  return (
    <div className="info_sheet_content">
      <div className="white_block info_sheet_title_block">
        <p className="title_text">{title}</p>
      </div>
      <div className="white_block">
        <Output data={dataForOutput} />
      </div>
    </div>
  );
}

export default InfoSheetContent;
