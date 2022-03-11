import React, { useEffect, useState } from "react";
import { useParams, useSearchParams } from "react-router-dom";
import { getArticles } from "../api";
import ErrorHandler from "../Root/ErrorHandler";
import ArticleCard from "./ArticleCard";
import ArticleNav from "./ArticleNav";

export default function Articles() {
  const [articles, setArticles] = useState([]);

  const [articlesError, setArticlesError] = useState(false);
  const [searchParams, setSearchParams] = useSearchParams();
  const { topic } = useParams();
  useEffect(() => {
    getArticles({ topic, sort_by: searchParams.get("sort_by"), order: searchParams.get("order") })
      .then(setArticles)
      .then(() => {
        setArticlesError(false);
      })
      .catch(() => {
        setArticlesError({ code: 400, msg: "Invalid search filters" });
      });
  }, [topic, searchParams]);

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
