import React, { useContext, useState } from "react";
import { useParams } from "react-router-dom";
import { deleteComment, getComments } from "../api";
import getTimePassedSince from "../getTimePassedSince";
import { UserContext } from "../Root/UserContext";

export default function CommentCard({ comment, setArticleComments, profilePics }) {
  const { user } = useContext(UserContext);
  const { article_id } = useParams();
  const [isDeleting, setIsDeleting] = useState(false);
  return (
    <div className="article-comment-card">
      <div className="comment-details">
        <img className="comment-profile-picture" src={profilePics[comment.author]} alt="author avatar" />
        <text className="comment-author">{comment.author}</text>
        <text className="comment-time-since">{getTimePassedSince(comment.created_at)}</text>

        {user.username === comment.author && (
          <button
            className="delete-comment-btn"
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
            {isDeleting ? "Deleting..." : "Delete Comment"}
          </button>
        )}
      </div>
      <div className="comment-body">
        <text>{comment.body}</text>
      </div>
    </div>
  );
}
