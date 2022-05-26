import './App.scss';
import {
  FC,
} from 'react';
import {
  NavLink,
  Routes,
  Route,
} from 'react-router-dom';
import { HomePage } from './pages/HomePage';
import { PeopleTable } from './pages/PeopleTable';
import { NotFound } from './pages/NotFound';

const App: FC = () => {
  return (
    <div className="App">
      <nav className="App__navigation">
        <NavLink
          to="/"
          className={
            ({ isActive }: { isActive: boolean }): string | undefined => {
              return isActive
                ? 'App__navigation-link active'
                : 'App__navigation-link';
            }
          }
        >
          Home
        </NavLink>

        <NavLink
          to="/people"
          className={
            ({ isActive }: { isActive: boolean }): string | undefined => {
              return isActive
                ? 'App__navigation-link active'
                : 'App__navigation-link';
            }
          }
        >
          People
        </NavLink>
      </nav>

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
