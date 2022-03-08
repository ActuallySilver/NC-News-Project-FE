import { BrowserRouter, Route, Routes } from "react-router-dom";
import "./App.css";
import Articles from "./components/Articles/Articles";
import Header from "./components/Root/Header";
import Users from "./components/Users/Users";

function App() {
  return (
    <BrowserRouter>
      <div className="App">
        <Header />
        <Routes>
          <Route path="/" element={<Articles />} />
          <Route path="/users" element={<Users />} />
        </Routes>
      </div>
    </BrowserRouter>
  );
}

export default App;
