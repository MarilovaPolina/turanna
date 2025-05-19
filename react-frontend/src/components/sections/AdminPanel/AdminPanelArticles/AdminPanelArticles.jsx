import React from "react";

const renderBlock = (block, index) => {
  switch (block.type) {
    case "header": {
      const HeaderTag = `h${block.data.level || 1}`;
      const className = block.data.level === 1 ? "small_title_text" : "header";
      return (
        <HeaderTag
          key={block.id || index}
          className={className}
          dangerouslySetInnerHTML={{ __html: block.data.text }}
        />
      );
    }

    case "paragraph":
      return (
        <p
          key={block.id || index}
          className="paragraph_text"
          dangerouslySetInnerHTML={{ __html: block.data.text }}
        />
      );

    case "list": {
      const ListTag = block.data.style === "ordered" ? "ol" : "ul";
      const className = block.data.style === "ordered" ? "ol_list" : "list";

      const renderListItems = (items) => {
        return items.map((item, idx) => (
          <li key={idx}>
            <span dangerouslySetInnerHTML={{ __html: item.content }} />
            {item.items && item.items.length > 0 && (
              <ul className="list">{renderListItems(item.items)}</ul>
            )}
          </li>
        ));
      };

      return (
        <ListTag
          key={block.id || index}
          className={className}
          start={block.data.meta?.start || undefined}
        >
          {renderListItems(block.data.items)}
        </ListTag>
      );
    }

    case "checklist":
      return (
        <ul key={block.id || index} className="checklist">
          {block.data.items.map((item, idx) => (
            <li key={idx} style={{ listStyleType: "none" }}>
              <input type="checkbox" checked={item.checked} readOnly />{" "}
              <span dangerouslySetInnerHTML={{ __html: item.text }} />
            </li>
          ))}
        </ul>
      );

    default:
      return (
        <pre key={block.id || index} style={{ color: "red" }}>
          Неизвестный блок: {block.type}
        </pre>
      );
  }
};

const EditorContentArticle = ({ content }) => {
  if (!content || !content.blocks) return null;

  return (
    <div>
      {content.blocks.map((block, index) => renderBlock(block, index))}
    </div>
  );
};

export default EditorContentArticle;
