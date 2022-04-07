import { Route, Routes } from 'react-router-dom';

import './App.scss';
import { HomePage } from './Compontents/HomePage/HomePage';
import { MainNav } from './Compontents/MainNav/MainNav';
import { NotFoundPage } from './Compontents/NotFoundPage/NotFoundPage';
import { PeoplePage } from './Compontents/PeoplePage/PeoplePage';

const App = () => (
  <div className="App">
    <MainNav />
    <Routes>

      <Route path="/people" element={<PeoplePage />} />

      <Route path="/" element={<HomePage />} />

      <Route path="*" element={<NotFoundPage />} />

    </Routes>
  </div>
);

export default App;
