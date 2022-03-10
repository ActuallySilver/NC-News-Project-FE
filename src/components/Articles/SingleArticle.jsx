import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { getArticle, getComments } from "../api";
import getTimePassedSince from "../getTimePassedSince";

export default function SingleArticle() {
  const { article_id } = useParams();
  const [article, setArticle] = useState({});
  const [articleComments, setArticleComments] = useState([]);
  useEffect(() => {
    getArticle(article_id).then(setArticle);
    getComments(article_id).then(setArticleComments);
  }, [article_id]);

  return (
    <div>
      <h2>{article.title}</h2>
      <div className="article-details">
        <section className="stats">
          <section className="article-creation-info">
            <h5>{getTimePassedSince(article.created_at)}</h5>
            <h4>{article.topic}</h4>
            <h4>By {article.author}</h4>
          </section>
          <section className="article-stats">
            <h4>{article.votes} votes </h4>
            <h4>{article.comment_count} comments</h4>
          </section>
        </section>
        <section className="article-body">
          <p>{article.body}</p>
        </section>
        <div className="article-comments">
          <h3>Comments</h3>
          {articleComments.map((comment) => {
            return <CommentCard key={comment.comment_id} comment={comment} />;
          })}
        </div>
      </div>
    </div>
  );
}
