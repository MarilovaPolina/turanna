import React from 'react';

const EditorContentArticle = ({ content }) => {
  if (!content) return <>–</>;

  let parsedContent;
  try {
    parsedContent = typeof content === 'string' ? JSON.parse(content) : content;
  } catch {
    return <em>Invalid content format</em>;
  }

  
  const blocks = parsedContent.blocks || parsedContent.content?.blocks;
  if (!blocks || !Array.isArray(blocks)) return <em>No content</em>;

  const renderBlock = (block) => {
    switch (block.type) {
      case 'header': {
        const Tag = `h${Math.min(Math.max(block.data.level || 1, 1), 6)}`;
        return <Tag key={block.id || Math.random()}>{block.data.text}</Tag>;
      }

      case 'paragraph':
        return <p key={block.id || Math.random()} dangerouslySetInnerHTML={{ __html: block.data.text }} />;

      case 'list': {
        const ListTag = block.data.style === 'ordered' ? 'ol' : 'ul';
        return (
          <ListTag key={block.id || Math.random()}>
            {block.data.items.map((item, i) => {
              const content = typeof item === 'string' ? item : item.content || '';
              return <li key={i} dangerouslySetInnerHTML={{ __html: content }} />;
            })}
          </ListTag>
        );
      }

      case 'checklist': {
        return (
          <ul key={block.id || Math.random()} style={{ listStyleType: 'none', paddingLeft: 0 }}>
            {block.data.items.map((item, i) => (
              <li key={i}>
                <input type="checkbox" checked={item.checked} readOnly />{' '}
                <span dangerouslySetInnerHTML={{ __html: item.content || item }} />
              </li>
            ))}
          </ul>
        );
      }

      case 'image': {
        return (
          <figure key={block.id || Math.random()} style={{ maxWidth: 400 }}>
            <img
              src={block.data.file?.url || block.data.url}
              alt={block.data.caption || ''}
              style={{ maxWidth: '100%' }}
            />
            {block.data.caption && <figcaption>{block.data.caption}</figcaption>}
          </figure>
        );
      }

      default:
        return null;
    }
  };

  return <div className="editor-content-preview">{blocks.map(renderBlock)}</div>;
};

export default EditorContentArticle;
