import { Routes, Route, Navigate } from 'react-router-dom';
import { HomePage } from './components/HomePage';
import { PeoplePage } from './components/PeoplePage';
import { NotFoundPage } from './components/NotFoundPage';
import { Header } from './components/Header';
import 'bulma';

const App = () => {
  return (
    <div className="App">
      <Header />

      <div>
        <Routes>
          <Route
            path="/"
            element={
              <HomePage />
            }
          />

          <Route
            path="/people"
            element={
              <PeoplePage />
            }
          />

          <Route
            path="/home"
            element={
              <Navigate to="/" />
            }
          />

          <Route
            path="*"
            element={
              <NotFoundPage />
            }
          />
        </Routes>
      </div>
    </div>
  );
};

export default App;
