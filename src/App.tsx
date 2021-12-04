import { Routes, Route } from 'react-router-dom';
import { Layout } from './components/Layout';
import { HomePage } from './components/Pages/HomePage';
import { PeoplePage } from './components/Pages/PeoplePage';
import { PageNotFound } from './components/Pages/PageNotFound';

import './App.scss';

const App: React.FC = () => (
  <Routes>
    <Route path="/" element={<Layout />}>
      <Route index element={<HomePage />} />
      <Route path="people" element={<PeoplePage />} />
      <Route path="*" element={<PageNotFound />} />
    </Route>
  </Routes>
);

export default App;
