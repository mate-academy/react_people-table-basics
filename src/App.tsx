import './App.scss';
import {
  Route,
  Routes,
  Navigate,
} from 'react-router-dom';
import { Navigation } from './components/Navigation';
import { PeopleTable } from './components/PeoplePage';
import { PageNotFound } from './components/PageNotFound';

const App = () => (
  <div className="App">
    <Navigation />

    <Routes>
      <Route
        path="/"
        element={<h1>Home</h1>}
      />

      <Route path="/home" element={<Navigate to="/" replace />} />
      <Route
        path="/table"
        element={<PeopleTable />}
      />

      <Route path="*" element={<PageNotFound />} />
    </Routes>
  </div>
);

export default App;
