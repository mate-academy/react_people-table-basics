import './App.scss';
import {
  Navigate,
  Route,
  Routes,
} from 'react-router-dom';
import { HomePage } from './components/Loader/HomePage';
import { PeoplePage } from './components/PeoplePage';
import { PageNotFound } from './components/PageNotFound';
import { Header } from './components/Header';

export const App = () => (
  <div data-cy="app">
    <Header />

    <main className="section">
      <div className="container">
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/people">
            <Route index element={<PeoplePage />} />
            <Route path=":slug" element={<PeoplePage />} />
          </Route>
          <Route path="*" element={<PageNotFound />} />
          <Route path="/home" element={<Navigate to="/" replace />} />
        </Routes>
      </div>
    </main>
  </div>
);
