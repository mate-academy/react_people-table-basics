import { Navigate, Route, Routes } from 'react-router-dom';
import './App.scss';
import { HomePage } from './components/HomePage';
import { Navigation } from './components/Navigation';
import { PageNotFound } from './components/PageNotFound';
import { PeoplePage } from './components/PeoplePage';

export const App = () => (
  <div data-cy="app">
    <Navigation />

    <main className="section">
      <div className="container">
        <Routes >
          <Route path="/" element={<HomePage />} />
          <Route path="home" element={<Navigate to="/" replace/>} />

          <Route path="people">
            <Route index element={<PeoplePage />}/>
            <Route path=":slug" element={<PeoplePage />}/>
          </Route>

          <Route path="*" element={<PageNotFound />}/>
        </Routes>
      </div>
    </main>
  </div>
);
