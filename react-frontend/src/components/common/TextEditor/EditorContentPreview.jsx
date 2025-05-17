import React from 'react';

const EditorContentPreview = ({ content }) => {
  if (!content ) return '–'; 

  const parsedContent = typeof content === 'string' ? JSON.parse(content) : content;
  if (!parsedContent) return 'No content';
  
  const blocks = parsedContent.blocks || parsedContent.content?.blocks;

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

  const noHtml = textOnly
    .replace(/<\/?[^>]+(>|$)/g, '')
    .replace(/&nbsp;/g, ' ');

  const sliced = noHtml.slice(0, 200);

  return (
    <div className="text_preview_cell">
      {sliced}
      {noHtml.length > 200 ? '…' : ''}
    </div>
  );
};

export default EditorContentPreview;
