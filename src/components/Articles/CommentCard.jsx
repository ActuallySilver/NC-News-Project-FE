import React from "react";
import getTimePassedSince from "../getTimePassedSince";

export default function CommentCard({ comment }) {
  return (
    <div className="article-comment-card">
      <dl>
        <dt>
          <strong>{comment.author}</strong> {getTimePassedSince(comment.created_at)}
        </dt>
        <dt>{comment.body}</dt>
      </dl>
    </div>
  );
}
