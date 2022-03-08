import React, { Fragment, useEffect, useState } from "react";
import { getArticles } from "../api";
import ArticleCard from "./ArticleCard";

export default function Articles() {
  const [topics, setTopics] = useState([]);
  const [articles, setArticles] = useState([]);
  useEffect(() => {
    getArticles().then(setArticles);
  }, []);
  return (
    <div className="articles-container">
      Articles
      <>
        {articles.map((article) => {
          return <ArticleCard key={article.title} article={article} />;
        })}
      </>
    </div>
  );
}
