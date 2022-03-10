import React, { useContext, useState } from "react";
import { useParams } from "react-router-dom";
import { deleteComment, getComments } from "../api";
import getTimePassedSince from "../getTimePassedSince";
import { UserContext } from "../Root/UserContext";

export default function CommentCard({ comment, setArticleComments }) {
  const { user } = useContext(UserContext);
  const { article_id } = useParams();
  const [isDeleting, setIsDeleting] = useState(false);
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
              if (!isDeleting) {
                setIsDeleting(true);
                deleteComment(comment.comment_id)
                  .then(() => {
                    return getComments(article_id).then(setArticleComments);
                  })
                  .then(() => {
                    setIsDeleting(false);
                  });
              }
            }}
          >
            Delete Comment
          </button>
        )}
      </dl>
    </div>
  );
}
