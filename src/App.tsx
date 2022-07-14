import { Routes, Route, Navigate } from 'react-router-dom';
import { Header } from './Components/Header/Header';
import { HomePage } from './Components/HomePage/HomePage';
import { PeoplePage } from './Components/PeoplePage/PeoplePage';
import 'bulma';
import './App.scss';

const App = () => (
  <div className="App container is-fluid">
    <Header />

    <Routes>
      <Route
        path="/"
        element={<HomePage />}
      />

      <Route
        path="/home"
        element={<Navigate to="/" />}
      />

      <Route
        path="/people"
        element={<PeoplePage />}
      />

      <Route
        path="*"
        element={<h2>Page not found</h2>}
      />
    </Routes>
  </div>
);

export default App;
