import React, { useEffect, useState } from "react";
import { addCommentToArticle, getComments, getUserByUsername } from "../api";
import ErrorHandler from "../Root/ErrorHandler";
import CommentCard from "./CommentCard";

export default function ArticleComments({ article_id, article, user }) {
  const [CommentsError, setCommentsError] = useState(false);
  const [articleComments, setArticleComments] = useState([]);
  const [newComment, setNewComment] = useState("");
  const [disableCommenting, setDisableCommenting] = useState(false);
  const [profilePics, setProfilePics] = useState({});

  function loadComments() {
    getComments(article_id)
      .then(setArticleComments)
      .catch(() => {
        setCommentsError({ code: 404, msg: "Comments not found" });
      });
  }
  function getProfilePic(username) {
    if (profilePics[username]) return profilePics[username];
    return getUserByUsername(username)
      .then(({ avatar_url }) => {
        return setProfilePics((currentProfiles) => {
          currentProfiles[username] = avatar_url;
          return currentProfiles;
        });
      })
      .then((profilePics) => {
        return profilePics[username];
      });
  }

  useEffect(loadComments, [article_id]);
  return CommentsError ? (
    <ErrorHandler error={CommentsError} />
  ) : (
    <div className="article-comments">
      <text className="article-comments-header">Comments ({article.comment_count})</text>
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
        <text className="article-comments-newcomment">New comment:</text>
        <textarea
          className="article-comment-input"
          value={newComment}
          onChange={(e) => {
            setNewComment(e.target.value);
          }}
          name="comment_body"
          id="comment_body"
          rows="4"
        ></textarea>
        <br />
        <button className="article-comment-post">Post comment</button>
      </form>
      {articleComments.map((comment) => {
        getProfilePic(comment.author);
        return <CommentCard profilePics={profilePics} setArticleComments={setArticleComments} key={comment.comment_id} comment={comment} />;
      })}
    </div>
  );
}
