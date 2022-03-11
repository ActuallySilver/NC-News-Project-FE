import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { getArticles } from "../api";
import ErrorHandler from "../Root/ErrorHandler";
import ArticleCard from "./ArticleCard";
import ArticleNav from "./ArticleNav";

export default function Articles() {
  const [articles, setArticles] = useState([]);
  const [articlesError, setArticlesError] = useState(false);
  const { topic } = useParams();
  useEffect(() => {
    getArticles(topic)
      .then(setArticles)
      .then(() => {
        setArticlesError(false);
      })
      .catch(() => {
        setArticlesError({ code: 400, msg: "Invalid search filters" });
      });
  }, [topic]);

  return articlesError ? (
    <ErrorHandler error={articlesError} />
  ) : (
    <div className="articles-container">
      <ArticleNav />
      <>
        {articles.map((article) => {
          return <ArticleCard key={article.title} article={article} />;
        })}
      </>
    </div>
  );
}
