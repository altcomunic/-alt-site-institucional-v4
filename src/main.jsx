import React, { lazy, Suspense } from "react";
import { createRoot } from "react-dom/client";
import App from "./App.jsx";
import { BlogIndex, BlogPost } from "./Blog.jsx";
import "./styles/global.css";
import "./styles/refinement.css";
import "./styles/network-background.css";

const StudioPage = lazy(() => import("./StudioPage.jsx"));
const path = window.location.pathname.replace(/\/$/, "") || "/";
let page = <App />;
if (path === "/blog") page = <BlogIndex />;
if (path.startsWith("/blog/")) page = <BlogPost slug={decodeURIComponent(path.slice(6))} />;
if (path === "/studio" || path.startsWith("/studio/")) page = <Suspense fallback={<div className="studio-loading">Carregando Blog ALT...</div>}><StudioPage /></Suspense>;

createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    {page}
  </React.StrictMode>
);
