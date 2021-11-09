import {
  BrowserRouter,
  Routes,
  Route,
} from 'react-router-dom';

import './App.scss';
import { PeoplePage } from './components/PeoplePage';
import { Home } from './components/Home';
import { HeadNavigation } from './components/HeadNavigation';
import { NotFound } from './components/NotFound';

const App = () => (
  <BrowserRouter>
    <HeadNavigation />
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/home" element={<Home />} />
      <Route path="/people" element={<PeoplePage />} />
      <Route path="*" element={<NotFound />} />
    </Routes>
  </BrowserRouter>
);

export default App;
