import axios from "axios";
const newsApi = axios.create({ baseURL: "https://jasonw-nc-news.herokuapp.com/api" });
export const getArticles = () => {
  return newsApi.get("articles").then((res) => {
    return res.data.articles;
  });
};
