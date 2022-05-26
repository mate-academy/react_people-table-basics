import './App.scss';
import {
  FC,
} from 'react';
import {
  Routes,
  Route,
} from 'react-router-dom';
import { HomePage } from './pages/HomePage';
import { PeopleTable } from './pages/PeopleTable';
import { NotFound } from './pages/NotFound';
import { Navigation } from './components/Navigation/Navigation';

const App: FC = () => {
  return (
    <div className="App">
      <Navigation />

      <Routes>
        <Route
          path="/"
          element={<HomePage />}
        />

        <Route
          path="/home"
          element={<HomePage />}
        />

        <Route path="/people" element={<PeopleTable />} />

        <Route path="*" element={<NotFound />} />
      </Routes>
    </div>
  );
};

export default App;
