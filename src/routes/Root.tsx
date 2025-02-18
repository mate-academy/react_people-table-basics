import React from "react";
import { Navigate, Route, HashRouter as Router, Routes } from 'react-router-dom';
import { App } from '../App';
import { People } from "../pages/People";
import { Home } from "../pages/Home";

export const Root: React.FC = () => {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<App />}>
          <Route index element={<Home />} />
          <Route path="/home" element={<Navigate to="/" replace={true} />} />
          <Route path="people">
            <Route path=":personSlug?" element={<People />} />
          </Route>
          <Route path="*" element={<h1 className="title">Page not found</h1>} />
        </Route>
      </Routes>
    </Router>
  );
};
