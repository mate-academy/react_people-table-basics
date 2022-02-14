import { Route, Routes, Navigate } from 'react-router-dom';
import Home from './components/Home';
import People from './components/People';
import WrongPage from './components/WrongPage';
import Navigation from './components/Navigation';

import './App.scss';

const App = () => (
  <div className="App">
    <Navigation />
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/people" element={<People />} />
      <Route path="/home" element={<Navigate to="/" />} />
      <Route path="*" element={<WrongPage />} />
    </Routes>
  </div>
);

export default App;
