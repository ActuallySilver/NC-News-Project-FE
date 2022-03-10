import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { addVotesToArticle, getArticle, getComments } from "../api";
import getTimePassedSince from "../getTimePassedSince";
import CommentCard from "./CommentCard";

export default function SingleArticle() {
  const { article_id } = useParams();
  const [article, setArticle] = useState({});
  const [articleComments, setArticleComments] = useState([]);
  const [voted, setVoted] = useState(false);
  useEffect(() => {
    getArticle(article_id).then(setArticle);
    getComments(article_id).then(setArticleComments);
  }, [article_id]);
  function changeVotes(val) {
    setVoted((currentVoted) => {
      return !currentVoted;
    });
    addVotesToArticle(article_id, val).then(() => {
      setArticle((currentArticle) => {
        const copyArticle = { ...currentArticle };
        copyArticle.votes += val;
        return copyArticle;
      });
    });
  }

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

            {!voted ? (
              <button
                onClick={() => {
                  changeVotes(1);
                }}
              >
                Vote for article
              </button>
            ) : (
              <button
                onClick={() => {
                  changeVotes(-1);
                }}
              >
                Remove vote
              </button>
            )}
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
