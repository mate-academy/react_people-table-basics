import { Navigation } from './components/Navigation/Navigation';

import './App.scss';
import { Outlet, Route, Routes } from 'react-router-dom';
import { Home } from './components/Home/Home';
import { People } from './components/People/People';
import { NavigateHome } from './components/Home/NavigateHome';
import { PageNotFound } from './components/PageNotFound/PageNotFound';

export const App = () => (
  <div data-cy="app">
    <Navigation />

    <main className="section">
      <div className="container">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/home" element={<NavigateHome />} />
          <Route path="/people" element={<People />}>
            <Route path=":personSlug" element={<People />} />
          </Route>
          <Route path="*" element={<PageNotFound />} />
        </Routes>
        <Outlet />
      </div>
    </main>
  </div>
);
