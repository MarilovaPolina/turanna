import React from 'react';

const EditorContentPreview = ({ content }) => {
  const parsedContent =
    typeof content === 'string' ? JSON.parse(content) : content;

  const blocks = parsedContent.blocks || parsedContent.content?.blocks;

  if (!blocks) return '–';

  const textOnly = blocks
    .filter((block) => block.type !== 'image')
    .map((block) => {
      switch (block.type) {
        case 'header':
        case 'paragraph':
          return block.data.text;
        case 'list':
        case 'checklist':
          return block.data.items.map((item) => item.content || item).join(' ');
        default:
          return '';
      }
    })
    .join(' ');

  const noHtml = textOnly.replace(/<\/?[^>]+(>|$)/g, '');

  const sliced = noHtml.slice(0, 200);

  return (
    <div className="text_preview_cell">
      {sliced}
      {noHtml.length > 200 ? '…' : ''}
    </div>
  );
};

export default EditorContentPreview;

