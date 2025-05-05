import React from 'react';

const RenderEditorContent = ({ content }) => {
  const parsedContent =
    typeof content === 'string' ? JSON.parse(content) : content;

  const blocks = parsedContent.blocks || parsedContent.content?.blocks;

  if (!blocks) return '–';

  return (
    <>
      {blocks.map((block) => {
        switch (block.type) {
          case 'header':
            return (
              <div
                key={block.id}
                className="small_title_text"
                dangerouslySetInnerHTML={{ __html: block.data.text }}
              />
            );

          case 'paragraph':
            return (
              <p
                key={block.id}
                dangerouslySetInnerHTML={{ __html: enhanceLinks(block.data.text) }}
              />
            );

          case 'list':
            if (block.data.style === 'unordered') {
              return (
                <ul key={block.id} className="list">
                  {block.data.items.map((item, index) => (
                    <li key={index}>
                      <span dangerouslySetInnerHTML={{ __html: enhanceLinks(item.content) }} />
                    </li>
                  ))}
                </ul>
              );
            } else if (block.data.style === 'ordered') {
              return (
                <ol key={block.id} className="ol_list">
                  {block.data.items.map((item, index) => (
                    <li key={index}>
                      <span dangerouslySetInnerHTML={{ __html: enhanceLinks(item.content) }} />
                    </li>
                  ))}
                </ol>
              );
            } else if (block.data.style === 'checklist') {
              return (
                <div key={block.id}>
                  {block.data.items.map((item, index) => (
                    <label key={index}>
                      <input
                        type="checkbox"
                        checked={item.meta.checked}
                        readOnly
                      />
                      <span dangerouslySetInnerHTML={{ __html: enhanceLinks(item.content) }} />
                    </label>
                  ))}
                </div>
              );
            }
            break;

          case 'image':
            return (
              <div key={block.id} style={{ margin: '1em 0' }}>
                <img
                  src={block.data.file.url}
                  alt={block.data.caption || ''}
                  style={{ maxWidth: '100%' }}
                />
                {block.data.caption && <p>{block.data.caption}</p>}
              </div>
            );

          default:
            return null;
        }
      })}
    </>
  );
};

const enhanceLinks = (html) => {
  return html.replace(/<a /g, '<a class="underline_blue_link" ');
};

export default RenderEditorContent;
