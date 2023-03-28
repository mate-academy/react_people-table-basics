import { Navigate, Route, Routes } from 'react-router-dom';
import './App.scss';

import Nav from '../Nav/Nav';
import Main from '../Main/Main';
import People from '../People/People';
import PageNotFound from '../PageNotFound/PageNotFound';

export const App = () => (
  <div data-cy="app">
    <Nav />

    <main className="section">
      <div className="container">
        <Routes>
          <Route path="*" element={<PageNotFound />} />
          <Route path="/" element={<Main />} />
          <Route path="/home" element={<Navigate to="/" replace />} />
          <Route path="/people">
            <Route index element={<People />} />
            <Route path=":personSlug" element={<People />} />
          </Route>
        </Routes>
      </div>
    </main>
  </div>
);
