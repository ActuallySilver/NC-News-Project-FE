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
            <VoteButton article_id={article_id} setArticle={setArticle} />
          </section>
        </section>
        <section className="article-body">
          <p>{article.body}</p>
        </section>
        {<ArticleComments article_id={article_id} article={article} user={user} />}
      </div>
    </div>
  );
}
