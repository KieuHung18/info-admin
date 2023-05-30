import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Routes, Route } from "react-router-dom";
import ComponentsDemo from "./features/components-demo";
import PersonalInfo from "./features/settings/personal-info";
import Artwork from "./features/artwork";
import Login from "./features/login";
function App() {
  const pageList = [
    { path: "/", component: <>hi</> },
    { path: "/*", component: <>notfound</> },
    { path: "/components-demo", component: <ComponentsDemo /> },
    { path: "/settings/personal-info", component: <PersonalInfo /> },
    { path: "/login", component: <Login /> },
    { path: "/artwork", component: <Artwork /> },
  ];

  const pages = pageList.map((p, i) => (
    <Route key={i} path={p.path} element={p.component} />
  ));
  return (
    <div className="text-neutral-light">
      <Routes>{pages}</Routes>
    </div>
  );
}

export default App;
