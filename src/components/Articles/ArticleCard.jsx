import React from "react";
import { useNavigate } from "react-router-dom";
import getTimePassedSince from "../getTimePassedSince";

export default function ArticleCard({ article }) {
  const navigate = useNavigate();

  return (
    <div
      className="article-card"
      onClick={() => {
        navigate(`/articles/${article.article_id}`);
      }}
    >
      <h4>{article.title}</h4>
      <dl>
        <dt className="article-author">By {article.author}</dt>
        <dt className="article-timestamp">
          🕓 {getTimePassedSince(article.created_at)} | {article.topic}{" "}
        </dt>
        <dt className="article-timestamp">
          {article.comment_count} Comments {article.votes} Votes
        </dt>
      </dl>
    </div>
  );
}
