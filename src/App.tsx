import './App.scss';
import {
  HashRouter as Router, Navigate, Route, Routes,
} from 'react-router-dom';
import { PeoplePage } from './components/PeoplePage';
import { Header } from './components/Header';

const App = () => {
  return (
    <Router>
      <div className="App">
        <Header />

        <Routes>
          <Route path="/" element={<h1>Homepage</h1>} />
          <Route path="/people" element={<PeoplePage />} />
          <Route path="/home" element={<Navigate to="/" replace />} />
          <Route path="*" element={<h1>Page not found</h1>} />
        </Routes>
      </div>
    </Router>
  );
};

export default App;
