import './App.scss';
import {
  Routes,
  Route,
  Navigate,
} from 'react-router-dom';

import { PeoplePage } from './components/PeoplePage/PeoplePage';
import { Header } from './components/Header/Header';

const App = () => (
  <div className="App">
    <Header />
    <Routes>
      <Route path="/" element={<h2>Home page</h2>} />
      <Route path="people" element={<PeoplePage />} />
      <Route path="home" element={<Navigate to="/" replace />} />

      <Route
        path="*"
        element={
          <p>Page not found</p>
        }
      />
    </Routes>
  </div>
);

export default App;
