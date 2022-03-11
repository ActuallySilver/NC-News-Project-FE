import React, { useEffect, useState } from "react";
import { Link, useSearchParams } from "react-router-dom";
import { getTopics } from "../api";

export default function ArticleNav() {
  const [searchParams, setSearchParams] = useSearchParams();
  const [topics, setTopics] = useState([]);
  const [order, setOrder] = useState("DESC");
  const [sortBy, setSortBy] = useState("created_at");
  const [showFilters, setShowFilters] = useState(false);

  function resetFilters() {
    setOrder("DESC");
    setSortBy("created_at");
  }

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
          <Link onClick={resetFilters} className="Link" key={topic.slug} to={"/topics/" + topic.slug}>
            {topic.slug}
          </Link>
        );
      })}
      <button
        onClick={() => {
          setShowFilters((currentSetting) => {
            return !currentSetting;
          });
        }}
      >
        Filters
      </button>

      {showFilters && (
        <section>
          Order{" "}
          <select
            name="order_by"
            id="order_by"
            onChange={(e) => {
              setSortBy(e.target.value);
            }}
            value={sortBy}
          >
            <option value="created_at">date</option>
            <option value="comment_count">comment count</option>
            <option value="votes">votes</option>
          </select>
          {" by "}
          <select
            value={order}
            name="order_type"
            id="order_type"
            onChange={(e) => {
              setOrder(e.target.value);
            }}
          >
            <option value="ASC">ascending</option>
            <option value="DESC">decending</option>
          </select>
          <button
            onClick={() => {
              setSearchParams({ sort_by: sortBy, order: order });
            }}
          >
            Apply
          </button>
          <button
            onClick={() => {
              setSearchParams({});
            }}
          >
            Clear filters
          </button>
        </section>
      )}
    </div>
  );
}
