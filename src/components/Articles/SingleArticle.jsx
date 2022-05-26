import React, { useContext, useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { getArticle } from "../api";
import getTimePassedSince from "../getTimePassedSince";
import ErrorHandler from "../Root/ErrorHandler";
import { UserContext } from "../Root/UserContext";
import ArticleComments from "../Comments/ArticleComments";

import VoteButton from "./VoteButton";

export default function SingleArticle() {
  const [ArticleError, setArticleError] = useState(false);

  const { article_id } = useParams();
  const [article, setArticle] = useState({});

  const { user } = useContext(UserContext);

  function loadArticle() {
    getArticle(article_id)
      .then(setArticle)
      .catch(() => {
        setArticleError({ code: 404, msg: "Article not found" });
      });
  }

  useEffect(() => {
    loadArticle();
  }, [article_id]);

  if (ArticleError) return <ErrorHandler error={ArticleError} />;
  return (
    <div className="single-article">
      <div className="article-details">
        <h1>{article.title}</h1>

        <section className="stats">
          <section className="article-creation-info">
            <p className="article-author">By {article.author}</p>
            <p>NC News, England</p>

            <p className="article-time-since">🕓 {getTimePassedSince(article.created_at)}</p>
          </section>
        </section>
      </div>
      <section className="article-body">
        <p>{article.body}</p>
      </section>
      <section className="article-votes">
        <text>{article.votes} votes </text>
        <VoteButton article_id={article_id} setArticle={setArticle} />
      </section>

      {<ArticleComments article_id={article_id} article={article} user={user} />}
    </div>
  );
}
