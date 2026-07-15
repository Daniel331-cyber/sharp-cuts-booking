import React from "react";
import ReactDOM from "react-dom/client";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import App from "./app/App";
import AdminPage from "./app/AdminPage";
import { registerSW } from 'virtual:pwa-register'
import { requestNotificationPermission } from "./notifications";

// @ts-ignore
import "./styles/index.css";
// @ts-ignore
import "./styles/tailwind.css";
// @ts-ignore
import "./styles/theme.css";
// @ts-ignore
import "./styles/fonts.css";
const updateSW = registerSW({
  onNeedRefresh() {
    console.log('New content available')
  },
  onOfflineReady() {
    console.log('App ready for offline use')
  },
})
//requestNotificationPermission();


ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<App />} />
        <Route path="/admin" element={<AdminPage />} />
      </Routes>
    </BrowserRouter>
  </React.StrictMode>
);