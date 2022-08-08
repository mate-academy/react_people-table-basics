import './App.scss';
import {
  Routes, Route, Navigate,
} from 'react-router-dom';
import PeoplePage from './components/PeoplePage/PeoplePage';
import Header from './components/Header/Header';

const App:React.FC = () => {
  return (
    <div className="App subtitle is-3">
      <Header />

      <Routes>
        <Route path="/" element={<h1>Home page</h1>} />
        <Route path="/home" element={<Navigate to="/" replace />} />
        <Route path="/people" element={<PeoplePage />} />

        <Route
          path="*"
          element={
            <p>Page not found</p>
          }
        />
      </Routes>
    </div>
  );
};

export default App;
