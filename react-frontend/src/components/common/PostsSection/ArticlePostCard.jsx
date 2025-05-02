import React from 'react';

export default function ArticlePostCard({ post }) {
  return (
    <div className="post_card article_card">
      <div className="card_image_wrapper">
        <img src={post.image} alt={post.title} loading="lazy" />
      </div>
      <div className="card_content">
        <p className="title_text article_card_title_text">{post.title > 50 ? post.title.slice(0, 50) + "..." : post.title }</p>
        <p className="article_short_description">{post.description.length > 102 ? post.description.slice(0, 102) + "..." : post.description}</p>
        <p className="date">{post.publication_date}</p>
      </div>
    </div>
  );
}