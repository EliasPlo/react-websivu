import React from "react";
import { Routes, Route, NavLink, HashRouter, BrowserRouter } from "react-router-dom";
import Koti from "./Koti";
import Kartta from "./Kartta";
import Tarina from "./Tarina";
import Yhteys from "./Yhteys";
import Video from "./Video";
import Footer from "./Footer";
import "./index";

const Main = () => {
  return (
    <HashRouter>
      <div>
        <h1>Perus Single Page Application (SPA)</h1>
        <ul className="header">
          <li><NavLink exact="true" to="/">Koti</NavLink></li>
          <li><NavLink to="/tarina">Tarina</NavLink></li>
          <li><NavLink to="/yhteys">Yhteys</NavLink></li>
          <li><NavLink to="/kartta">Kartta</NavLink></li>
          <li><NavLink to="/video">Video</NavLink></li>
        </ul>
        <div className="content">
          <Routes>
            <Route path="/" element={<Koti />} />
            <Route path="/tarina" element={<Tarina />} />
            <Route path="/yhteys" element={<Yhteys />} />
            <Route path="/kartta" element={<Kartta />} />
            <Route path="/video" element={<Video />} />
          </Routes>
        </div>
        <div>
          <Footer/>
        </div>
      </div>
    </HashRouter>
  );
};

export default Main;
