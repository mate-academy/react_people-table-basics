import './App.scss';
import {
  Route, Routes, Navigate,
} from 'react-router-dom';

import { Home } from './Components/Home';
import { NotFoundPage } from './Components/NotFoundPage';
import { People } from './Components/People';
import { Header } from './Components/Header';

const App = () => (
  <div className="App">
    <Header />

    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/people" element={<People />} />
      <Route path="/home" element={<Navigate to="/" />} />
      <Route path="*" element={<NotFoundPage />} />
    </Routes>
  </div>
);

export default App;
