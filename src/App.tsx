import './App.scss';
import {
  Routes,
  Route,
  Navigate,
} from 'react-router-dom';
import { Header } from './components/Header';
import { HomePage } from './components/HomePage';
import PeoplePage from './components/PeoplePage';

const App = () => (
  <div className="App">
    <Header />

    <Routes>
      <Route path="/" element={<HomePage />} />

      <Route path="/people" element={<PeoplePage />} />

      <Route
        path="/home"
        element={
          <Navigate to="/" replace />
        }
      />

      <Route
        path="*"
        element={
          <h1>Page not found</h1>
        }
      />
    </Routes>
  </div>
);

export default App;
