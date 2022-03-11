import { useState } from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import "./App.css";
import Articles from "./components/Articles/Articles";
import SingleArticle from "./components/Articles/SingleArticle";
import ErrorHandler from "./components/Root/ErrorHandler";
import Header from "./components/Root/Header";
import { UserContext } from "./components/Root/UserContext";
import Users from "./components/Users/Users";

function App() {
  const [user, setUser] = useState({});
  return (
    <BrowserRouter>
      <UserContext.Provider value={{ user, setUser }}>
        <div className="App">
          <Header />
          <Routes>
            <Route path="/" element={<Articles />} />
            <Route path="/articles/:article_id" element={<SingleArticle />} />
            <Route path="/topics/:topic" element={<Articles />} />
            <Route path="/users" element={<Users />} />
            <Route path="*" element={<ErrorHandler error={{ code: 404, msg: "Page not found" }} />} />
          </Routes>
        </div>
      </UserContext.Provider>
    </BrowserRouter>
  );
}

export default App;
