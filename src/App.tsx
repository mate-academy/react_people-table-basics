import { Route, Routes, Navigate } from 'react-router-dom';
import 'bulma/css/bulma.min.css';

import './App.scss';
import { Home } from './components/Home/Home';
import { PeoplePage } from './components/PeoplePage/PeoplePage';
import { NotFoundPage } from './components/NotFoundPage/NotFoundPage';
import { Layout } from './components/Layout/Layout';

const App = () => (
  <div className="App">
    <Routes>
      <Route path="/" element={<Layout />}>
        <Route index element={<Home />} />
        <Route path="/home" element={<Navigate to="/" />} />
        <Route path="people" element={<PeoplePage />} />
        <Route path="*" element={<NotFoundPage />} />
      </Route>
    </Routes>
  </div>
);

export default App;
