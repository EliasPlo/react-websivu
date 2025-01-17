import React from "react";
import ReactDOM from "react-dom/client";
import Main from "./Main";
import "./index.css";
/*import { Chart as ChartJS, CategoryScale, LinearScale, BarElement } from "chart.js";

// Rekisteröidään Chart.js komponentit
ChartJS.register(CategoryScale, LinearScale, BarElement);*/

// Luo juuri ja renderöi komponentti
const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <React.StrictMode>
    <Main />
  </React.StrictMode>
);
