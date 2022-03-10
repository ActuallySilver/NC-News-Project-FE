import React, { useContext } from "react";
import { useParams } from "react-router-dom";
import { deleteComment, getComments } from "../api";
import getTimePassedSince from "../getTimePassedSince";
import { UserContext } from "../Root/UserContext";

export default function CommentCard({ comment, setArticleComments }) {
  const { user } = useContext(UserContext);
  const { article_id } = useParams();
  return (
    <div className="article-comment-card">
      <dl>
        <dt>
          <strong>{comment.author}</strong> {getTimePassedSince(comment.created_at)}
        </dt>
        <dt>{comment.body}</dt>
        {user.username === comment.author && (
          <button
            onClick={() => {
              deleteComment(comment.comment_id).then(() => {
                getComments(article_id).then(setArticleComments);
              });
            }}
          >
            Delete Comment
          </button>
        )}
      </dl>
    </div>
  );
}
