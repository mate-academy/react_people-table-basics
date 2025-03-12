import './App.scss';
import NavBar from './components/NavBar/NavBar';
import { Navigate, Route, Routes } from 'react-router-dom';
import Home from './pages/Home/Home';
import FoundNot from './pages/FoundNot/FoundNot';
import People from './pages/People/People';

const App = () => {
  return (
    <div data-cy="app" style={{ padding: '2.95rem' }}>
      <NavBar />

      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/home" element={<Navigate to="/" />} />
        <Route path="/people" element={<People />} />
        <Route path="/people/:slug" element={<People />} />{' '}
        <Route path="*" element={<FoundNot />} />
      </Routes>
    </div>
  );
};

export default App;
