import React, { useContext, useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { addCommentToArticle, addVotesToArticle, getArticle, getComments } from "../api";
import getTimePassedSince from "../getTimePassedSince";
import { UserContext } from "../Root/UserContext";
import UseWindowSize from "../Root/useWindowSize";
import CommentCard from "./CommentCard";

export default function SingleArticle() {
  const { article_id } = useParams();
  const [article, setArticle] = useState({});
  const [articleComments, setArticleComments] = useState([]);
  const [voted, setVoted] = useState(false);
  const [newComment, setNewComment] = useState("");
  const [disableCommenting, setDisableCommenting] = useState(false);
  const { user } = useContext(UserContext);
  const windowSize = UseWindowSize();
  useEffect(() => {
    getArticle(article_id).then(setArticle);
    getComments(article_id).then(setArticleComments);
  }, [article_id]);
  function changeVotes(val) {
    setVoted((currentVoted) => {
      return !currentVoted;
    });
    addVotesToArticle(article_id, val);
    setArticle((currentArticle) => {
      const copyArticle = { ...currentArticle };
      copyArticle.votes += val;
      return copyArticle;
    });
  }

  return (
    <div>
      <h2>{article.title}</h2>
      <div className="article-details">
        <section className="stats">
          <section className="article-creation-info">
            <h5>{getTimePassedSince(article.created_at)}</h5>
            <h4>{article.topic}</h4>
            <h4>By {article.author}</h4>
          </section>
          <section className="article-stats">
            <h4>{article.votes} votes </h4>
            <h4>{article.comment_count} comments</h4>

            {!voted ? (
              <button
                onClick={() => {
                  changeVotes(1);
                }}
              >
                Vote for article
              </button>
            ) : (
              <button
                onClick={() => {
                  changeVotes(-1);
                }}
              >
                Remove vote
              </button>
            )}
          </section>
        </section>
        <section className="article-body">
          <p>{article.body}</p>
        </section>
        <div className="article-comments">
          <h3>Comments</h3>
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
            return <CommentCard key={comment.comment_id} comment={comment} />;
          })}
        </div>
      </div>
    </div>
  );
}
