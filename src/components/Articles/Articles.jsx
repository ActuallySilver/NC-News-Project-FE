import React, { useEffect, useState } from "react";
import { useParams, useSearchParams } from "react-router-dom";
import { getArticles } from "../api";
import ArticleCard from "./ArticleCard";
import ArticleNav from "./ArticleNav";

export default function Articles() {
  const [articles, setArticles] = useState([]);
  const [searchParams, setSearchParams] = useSearchParams();
  const { topic } = useParams();
  useEffect(() => {
    getArticles({ topic, sort_by: searchParams.get("sort_by"), order: searchParams.get("order") }).then(setArticles);
  }, [topic, searchParams]);
  return (
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
