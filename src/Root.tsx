import { Navigate, Route, Routes } from 'react-router-dom';
import { HashRouter as Router } from 'react-router-dom';
import { GlobalStateProvider } from './store';
import { NotFoundPage } from './page/NotFoundPage';
import { PeoplePage } from './page/PeoplePage';
import { HomePage } from './page/HomePage';
import { App } from './App';

export const Root = () => {
  return (
    <GlobalStateProvider>
      <Router>
        <Routes>
          <Route path="/" element={<App />}>
            <Route index element={<HomePage />} />
            <Route path="/home" element={<Navigate to="/" replace />} />
            <Route path="people">
              <Route index element={<PeoplePage />} />
              <Route path=":slug" element={<PeoplePage />} />
            </Route>
            <Route path="*" element={<NotFoundPage />} />
          </Route>
        </Routes>
      </Router>
    </GlobalStateProvider>
  );
};

/*
            <Route path="people" element={<PeoplePage />} />
            <Route path="people/:slug" element={<PeoplePage />} />
*/
