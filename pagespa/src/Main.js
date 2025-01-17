import React from "react";
import { Routes, Route, NavLink, HashRouter } from "react-router-dom";
import Koti from "./Koti";
import Kartta from "./Kartta";
import Tarina from "./Tarina";
import Yhteys from "./Yhteys";
import Video from "./Video";
//import Footer from "./Footer";
import TieKamera from "./TieKamera";
import Lomake from "./Lomake"; 
import Tunniste from "./Tunniste";
import Wiki from "./Wiki";
import Saa from "./Saa";
import "./index";
import { Chart as ChartJS, CategoryScale, LinearScale, BarElement } from "chart.js";

ChartJS.register(CategoryScale, LinearScale, BarElement);

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
          <li><NavLink to="/cam">TieKamera</NavLink></li>
          <li><NavLink to="/wiki">WikiSearch</NavLink></li>
          <li><NavLink to="/saa">SääTiedot</NavLink></li>
        </ul>
        <div className="content">
          <Routes>
            <Route path="/" element={<Koti />} />
            <Route path="/tarina" element={<Tarina />} />
            <Route path="/yhteys" element={<Yhteys />} />
            <Route path="/kartta" element={<Kartta />} />
            <Route path="/video" element={<Video />} />
            <Route path="/cam" element={<TieKamera />} />
            <Route path="/lomake" element={<Lomake />} />
            <Route path="/wiki" element={<Wiki />} />
            <Route path="/saa" element={<Saa />} />
          </Routes>
        </div>
        <div>
          <Tunniste/>
        </div>
      </div>
    </HashRouter>
  );
};

export default Main;
