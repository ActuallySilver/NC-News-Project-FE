import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { getTopics } from "../api";

export default function ArticleNav() {
  const [topics, setTopics] = useState([]);
  useEffect(() => {
    getTopics().then(setTopics);
  }, []);

  return (
    <div>
      <Link className="Link" key={"all"} to="/">
        All
      </Link>
      {topics.map((topic) => {
        return (
          <Link className="Link" key={topic.slug} to={"/topics/" + topic.slug}>
            {topic.slug}
          </Link>
        );
      })}
    </div>
  );
}
