import './App.scss';
import {
  Routes,
  Route,
  Navigate,
} from 'react-router-dom';
import { HomePage } from './components/HomePage';
import { PeopleTable } from './components/PeopleTable';
import { PageNotFound } from './components/PageNotFound';
import 'bulma/css/bulma.css';
import { Header } from './components/Header';

export const App = () => {
  return (
    <div className="App">
      <Header />

      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/home" element={<Navigate to="/" replace />} />
        <Route
          path="/people"
          element={<PeopleTable />}
        />
        <Route path="*" element={<PageNotFound />} />
      </Routes>
    </div>
  );
};
