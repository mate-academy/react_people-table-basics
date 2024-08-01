import "./App.scss";
import { Navigate, Route, Routes } from "react-router-dom";
import { Navigation } from "./components/Navigation/Navigation";
import { HomePage } from "./components/HomePage/HomePage";
import { PageNotFound } from "./components/PageNotFound/PageNotFound";
import { PeoplePage } from "./components/PeoplePage/PeoplePage";

export const App = () => {
  return (
    <>
      <div data-cy="app">
        <Navigation />

        <main className="section">
          <div className="container">
            <Routes>
              <Route path="/" element={<HomePage />} />
              <Route path="/home" element={<Navigate to="/" replace />} />

              <Route path="people">
                <Route index element={<PeoplePage />} />
                <Route path=":slugId" element={<PeoplePage />} />
              </Route>

              <Route path="*" element={<PageNotFound />} />
            </Routes>
          </div>
        </main>
      </div>
    </>
  );
};
