import './App.scss';
import {
  Route,
  Routes,
  NavLink,
  Navigate,
} from 'react-router-dom';
import 'bulma';
import { HomePage } from './components/HomePage/HomePage';
import { PeoplePage } from './components/PeoplePages/PeoplePage';
import { NotFoundPage } from './components/NotFoundPage/NotFoundPage';
import { ParentInfo } from './components/PeoplePages/ParentInfo';

const App = () => (
  <div className="App">
    <header className="is-flex is-justify-content-space-evenly">
      <NavLink
        to="/"
        className="navbar-item is-tab"
      >
        Home
      </NavLink>
      <NavLink
        to="people"
        className="navbar-item is-tab"
      >
        People
      </NavLink>
    </header>
    <main className="is-flex is-flex-direction-column is-align-items-center">
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route
          path="people/*"
          element={(
            <Routes>
              <Route index element={<PeoplePage />} />
              <Route path=":slug" element={<ParentInfo />} />
              <Route path="/*" element={<NotFoundPage />} />
            </Routes>
          )}
        />
        <Route path="/home" element={<Navigate to="/" />} />
        <Route path="*" element={<NotFoundPage />} />
      </Routes>
    </main>
  </div>
);

export default App;
