import { createRoot } from "react-dom/client";
import {
  HashRouter as Router,
  Routes,
  Route,
  Navigate,
} from "react-router-dom";

import "bulma/css/bulma.css";
import "@fortawesome/fontawesome-free/css/all.css";

import { HomePage } from "./components/Pages/HomePage";
import { PeoplePage } from "./components/Pages/PeoplePage";
import { NotFoundPage } from "./components/Pages/NotFoundPage";
import { App } from "./App";

createRoot(document.getElementById("root") as HTMLDivElement).render(
  <Router>
    <Routes>
      <Route path="/" element={<App />}>
        <Route index element={<HomePage />} />

        <Route path="/people">
          <Route index element={<PeoplePage />} />
          <Route path=":slug" element={<PeoplePage />} />
        </Route>

        <Route path="/home" element={<Navigate to="/" replace />} />
        <Route path="*" element={<NotFoundPage />} />
      </Route>
    </Routes>
  </Router>
);
