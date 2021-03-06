import React, { useState } from "react";
import { addVotesToArticle } from "../api";

export default function VoteButton({ article_id, setArticle }) {
  const [voted, setVoted] = useState(false);

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

  return !voted ? (
    <button
      className="article-vote-button"
      onClick={() => {
        changeVotes(1);
      }}
    >
      Add vote
    </button>
  ) : (
    <button
      className="article-vote-button"
      onClick={() => {
        changeVotes(-1);
      }}
    >
      {" "}
      Remove vote{" "}
    </button>
  );
}
