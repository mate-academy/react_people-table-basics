import './App.scss';
import { Navigate, Routes, Route } from 'react-router-dom';
import { Home } from './components/Home';
import { People } from './components/People';
import { NotFound } from './components/NotFound';
import { Header } from './components/Header';

const App = () => {
  return (
    <div className="App">
      <Header />
      <div>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/people" element={<People />} />
          <Route path="*" element={<NotFound />} />
          <Route path="/home" element={<Navigate to="/" />} />
        </Routes>
      </div>
    </div>
  );
};

export default App;
