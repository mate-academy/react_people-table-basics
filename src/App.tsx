import { Routes, Route } from 'react-router-dom';
import { HomePage } from './Components/HomePage';
import { PeoplePage } from './Components/PeoplePage';
import 'bulma';
import './App.scss';

const App = () => (
  <div className="App">

    <Routes>
      <Route
        path="/"
        element={<HomePage />}
      />

      <Route
        path="/home"
        element={<HomePage />}
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
