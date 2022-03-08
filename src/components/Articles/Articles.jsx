import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { getArticles, getArticlesByTopic } from "../api";
import ArticleCard from "./ArticleCard";
import ArticleNav from "./ArticleNav";

export default function Articles() {
  const [articles, setArticles] = useState([]);
  const { topic } = useParams();
  useEffect(() => {
    getArticles(topic).then(setArticles);
  }, [topic]);
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
