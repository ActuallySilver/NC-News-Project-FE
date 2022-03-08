import React from "react";

export default function ArticleCard({ article }) {
  const getTimePassedSince = (time) => {
    const currentTime = Date.now();
    const timePassed = currentTime - Date.parse(time);
    const years = Math.floor(timePassed / 1000 / 60 / 60 / 24 / 365.25);
    if (years !== 0) {
      if (years === 1) return years + " year ago";
      return years + " year ago";
    }
    const days = Math.floor(timePassed / 1000 / 60 / 60 / 24);
    if (days !== 0) {
      if (days === 1) return days + " day ago";
      return days + " days ago";
    }
    const hours = Math.floor(timePassed / 1000 / 60 / 60);
    if (hours !== 0) {
      if (hours === 1) return hours + " hour ago";
      return hours + " hours ago";
    }
    const minutes = Math.floor(timePassed / 1000 / 60);
    if (minutes !== 0) {
      if (minutes === 1) return minutes + " minute ago";
      return minutes + " minutes ago";
    }
    return "just now";
  };
  return (
    <div className="article-card">
      <h4>{article.title}</h4>
      <dl>
        <dt className="article-topic">{article.topic}</dt>
        <dt className="article-author">By {article.author}</dt>
        <dt className="article-timestamp">{getTimePassedSince(article.created_at)}</dt>
      </dl>
    </div>
  );
}
