import React from 'react';
import { Link } from 'react-router-dom';
import EditorContentPreview from '../TextEditor/EditorContentPreview';

export default function ArticlePostCard({ post }) {
  if (!post) return null;

  const id = post.id;
  const title = post.title || '';
  const description = post.description || '';
  const main_image = post.main_image || '';
  const publication_date = post.created_at
    ? new Date(post.created_at).toLocaleDateString('ru-RU')
    : '';

  return (
     <Link to={`/article/${id}`}>
      <div className="post_card article_card">
        <div className="card_image_wrapper">
          {main_image && <img src={`http://localhost:8000${main_image}`} alt={title} loading="lazy" />}
        </div>
        <div className="card_content">
          <p className="title_text article_card_title_text">
            {title.length > 50 ? title.slice(0, 50) + '...' : title}
          </p>
          <div className="article_short_description">
            <EditorContentPreview content={post.content} />  
          </div>
          <p className="date">{publication_date}</p>
        </div>
      </div>
    </Link>
  );
}