import {
  Route, Routes,
} from 'react-router-dom';

import './App.scss';
import { Navbar } from './components/Navbar';
import { NotFoundPage } from './components/NotFoundPage';
import { HomePage } from './components/HomePage';
import { PeoplePage } from './components/PeoplePage';

export const App = () => (
  <Routes>
    <Route path="/" element={<Navbar />}>
      <Route index element={<HomePage />} />
      <Route path="people" element={<PeoplePage />}>
        <Route path=":slug" element={<PeoplePage />} />
      </Route>
      <Route path="*" element={<NotFoundPage />} />
    </Route>
  </Routes>
);
