import './App.scss';
import {
  HashRouter,
  Routes,
  Route,
} from 'react-router-dom';

import { Homepage } from './components/Homepage';
import { PeoplePage } from './components/PeoplePage';
import { NotFoundPage } from './components/NotFoundPage';
import { Header } from './components/Header';

const App = () => (
  <HashRouter>
    <Header />
    <Routes>
      <Route path="/" element={<Homepage />} />
      <Route path="people" element={<PeoplePage />} />
      <Route path="*" element={<NotFoundPage />} />
    </Routes>
  </HashRouter>
);

export default App;
