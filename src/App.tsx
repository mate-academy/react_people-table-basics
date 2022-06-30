import {
  Route, Routes, Navigate,
} from 'react-router-dom';
import './App.scss';

import { Home } from './Components/Home';
import { People } from './Components/People';
import { NotFoundPage } from './Components/NotFoundPage';
import { Nav } from './Components/Nav';

const App = () => (
  <div className="App">
    <Nav />

    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/people" element={<People />} />
      <Route path="/home" element={<Navigate to="/" />} />
      <Route path="*" element={<NotFoundPage />} />
    </Routes>
  </div>
);

export default App;
