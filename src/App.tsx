import './App.scss';
import { Homepage } from './components/Homepage/Homepage';
import { NotFoundPage } from './components/NotFoundPage';
import { PeoplePage } from './components/PeoplePage';
import { Navbar } from './components/Navbar';
import { Route, Routes } from 'react-router-dom';

export const App = () => {
  return (
    <div data-cy="app">
      <Routes>
        <Route path="/" element={<Navbar />}>
          <Route index element={<Homepage />} />
          <Route path="people/:personId?" element={<PeoplePage />} />
          <Route path="*" element={<NotFoundPage />} />
        </Route>
      </Routes>
    </div>
  );
};
