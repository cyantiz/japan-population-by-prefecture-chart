import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";
import "./styles/index.css";
import axios from "axios";

const API_ENDPOINTS = "https://opendata.resas-portal.go.jp";
const PREFIX = "/api/v1";
const API_KEY = import.meta.env.VITE_VERCEL_ENV_API_KEY;

axios.defaults.baseURL = `${API_ENDPOINTS}${PREFIX}`;
axios.defaults.headers.common["X-API-KEY"] = API_KEY;
axios.defaults.headers.get["Content-Type"] = "application/json;charset=UTF-8";

ReactDOM.createRoot(document.getElementById("root") as HTMLElement).render(
    <React.StrictMode>
        <App />
    </React.StrictMode>
);
