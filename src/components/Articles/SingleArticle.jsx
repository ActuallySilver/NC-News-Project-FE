import React, { useContext, useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { getArticle, getUserByUsername } from "../api";
import getTimePassedSince from "../getTimePassedSince";
import ErrorHandler from "../Root/ErrorHandler";
import { UserContext } from "../Root/UserContext";
import ArticleComments from "../Comments/ArticleComments";

import VoteButton from "./VoteButton";

export default function SingleArticle() {
  const [ArticleError, setArticleError] = useState(false);

  const { article_id } = useParams();
  const [article, setArticle] = useState({});
  const [author, setAuthor] = useState({});

  const { user } = useContext(UserContext);

  function loadArticle() {
    getArticle(article_id)
      .then(setArticle)
      .catch(() => {
        setArticleError({ code: 404, msg: "Article not found" });
      });
  }

  useEffect(() => {
    getUserByUsername(article.author).then(setAuthor);
  }, [article]);
  useEffect(loadArticle, [article_id]);

  if (ArticleError) return <ErrorHandler error={ArticleError} />;
  return (
    <div className="single-article">
      <div className="article-details">
        <div className="article-title-container">
          <h1 className="article-title">{article.title}</h1>
        </div>
        <div className="article-profile-pic-container">
          <img className="single-article-profile-pic" src={author.avatar_url} alt={author.username} />
        </div>
        <section className="stats">
          <section className="article-creation-info">
            <p className="article-author">By {article.author}</p>
            <p className="article-time-since">NC News, England | {getTimePassedSince(article.created_at)}</p>
          </section>
        </section>
      </div>
      <section className="article-body">
        <p>{article.body}</p>
      </section>
      <section className="article-votes">
        <text className="article-vote-count">{article.votes} votes </text>
        <VoteButton article_id={article_id} setArticle={setArticle} />
      </section>
      {<ArticleComments article_id={article_id} article={article} user={user} />}
    </div>
  );
}
