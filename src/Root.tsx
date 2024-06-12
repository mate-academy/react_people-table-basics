import * as Router from 'react-router-dom';
import { App } from './App';
import { HomePage } from './pages/HomePage';
import { PeoplePage } from './pages/PeoplePage';
import { PeopleProvider } from './store/PeopleContext';

export const Root = () => {
  return (
    <Router.HashRouter>
      <PeopleProvider>
        <Router.Routes>
          <Router.Route path="/" element={<App />}>
            <Router.Route index element={<HomePage />} />
            <Router.Route path="people" element={<PeoplePage />} />
            <Router.Route path="people/:tabId" element={<PeoplePage />} />
            <Router.Route path="home" element={<Router.Navigate to="/" />} />
            <Router.Route
              path="*"
              element={<h1 className="title">Page not found</h1>}
            />
          </Router.Route>
        </Router.Routes>
      </PeopleProvider>
    </Router.HashRouter>
  );
}
