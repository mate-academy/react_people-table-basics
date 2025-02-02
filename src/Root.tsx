import { Navigate, Route, HashRouter as Router, Routes } from 'react-router-dom'
import { App } from './App'
import { HomePage } from './pages/HomePage'
import { PeoplePage } from './pages/PeoplePage'
import { PeopleProvider } from './store/PeopleContext';

export const Root = () => (
  <PeopleProvider>
    <Router>
      <Routes>
        <Route path="/" element={<App />}>
          <Route index element={<HomePage />} />
          <Route path="home" element={<Navigate to="/" replace={true} />} />
          <Route path="people">
            <Route path=":urlSlug?" element={<PeoplePage />} />
          </Route>
          <Route path="*" element={<h1 className="title">Page not found</h1>} />
        </Route>
      </Routes>
    </Router>
  </PeopleProvider>
);
