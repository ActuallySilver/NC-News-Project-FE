import React, { useEffect, useState } from "react";
import { addCommentToArticle, getComments } from "../api";
import ErrorHandler from "../Root/ErrorHandler";
import UseWindowSize from "../Root/useWindowSize";
import CommentCard from "./CommentCard";

export default function ArticleComments({ article_id, article, user }) {
  const [CommentsError, setCommentsError] = useState(false);
  const [articleComments, setArticleComments] = useState([]);
  const [newComment, setNewComment] = useState("");
  const [disableCommenting, setDisableCommenting] = useState(false);
  const windowSize = UseWindowSize();

  function loadComments() {
    getComments(article_id)
      .then(setArticleComments)
      .catch(() => {
        setCommentsError({ code: 404, msg: "Comments not found" });
      });
  }
  useEffect(() => {
    loadComments();
  }, []);
  return CommentsError ? (
    <ErrorHandler error={CommentsError} />
  ) : (
    <div className="article-comments">
      <h3>Comments ({article.comment_count})</h3>
      <form
        onSubmit={(e) => {
          e.preventDefault();
          if (!disableCommenting) {
            setDisableCommenting(true);
            if (!user.username) return window.alert("Please sign in");
            if (newComment.trim() === "") return window.alert("Please write a comment before submitting");
            addCommentToArticle(article_id, newComment, user.username).then((comment) => {
              setArticleComments((currentComments) => {
                return [comment, ...currentComments];
              });
              setNewComment("");
              setDisableCommenting(false);
            });
          }
        }}
      >
        <h4>New comment:</h4>
        <textarea
          value={newComment}
          onChange={(e) => {
            setNewComment(e.target.value);
          }}
          name="comment_body"
          id="comment_body"
          cols={Math.floor(windowSize[0] / 8)}
          rows="4"
        ></textarea>
        <button>Post comment</button>
      </form>
      {articleComments.map((comment) => {
        return <CommentCard setArticleComments={setArticleComments} key={comment.comment_id} comment={comment} />;
      })}
    </div>
  );
}
