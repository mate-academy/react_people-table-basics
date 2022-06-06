import './App.scss';
import {
  Routes,
  Route,
  Navigate,
  NavLink,
} from 'react-router-dom';

import HomePage from './components/HomePage';
import PeoplePage from './components/PeoplePage';
import NotFoundPage from './components/NotFoundPage';

const App = () => {
  return (
    <div className="App">
      <div className="App__container">
        <h1 className="App__title">People table</h1>
        <div className="App__links">
          <NavLink to="/home" className="App__link">Home</NavLink>
          <NavLink to="/people" className="App__link">People</NavLink>
        </div>
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/home" element={<Navigate to="/" replace />} />
          <Route path="/people" element={<PeoplePage />} />
          <Route path="*" element={<NotFoundPage />} />
        </Routes>
      </div>
    </div>
  );
};

export default App;
