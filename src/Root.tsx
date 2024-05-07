import { Route, HashRouter as Router, Routes } from 'react-router-dom';
import { App } from './App';
import { HomePage } from './pages/HomePage';
import { People } from './pages/People';
import { NotFound } from './pages/NotFound';
import { PeopleProvider } from './store/PeopleContext';

export const Root = () => (
  <Router>
    <PeopleProvider>
      <Routes>
        <Route path="/" element={<App />}>
          <Route index element={<HomePage />} />
          <Route path="people">
            <Route path=":slug?" element={<People />} />
          </Route>
          <Route path="*" element={<NotFound />} />
        </Route>
      </Routes>
    </PeopleProvider>
  </Router>
);
