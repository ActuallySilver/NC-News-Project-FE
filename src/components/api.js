import axios from "axios";
const newsApi = axios.create({ baseURL: "https://jasonw-nc-news.herokuapp.com/api" });
export const getArticles = (topic) => {
  return newsApi.get("articles", { params: { topic } }).then((res) => {
    return res.data.articles;
  });
};
export const getTopics = () => {
  return newsApi.get("topics").then((res) => {
    return res.data.topics;
  });
};

export const getArticle = (article_id) => {
  return newsApi.get(`articles/${article_id}`).then((res) => {
    return res.data.article;
  });
};

export const getComments = (article_id) => {
  return newsApi.get(`articles/${article_id}/comments`).then((res) => {
    return res.data.comments;
  });
};

export const addVotesToArticle = (article_id, votes) => {
  return newsApi.patch(`/articles/${article_id}`, { inc_votes: votes }).then((res) => {
    return res.data.article;
  });
};
