import {
  Link,
  Navigate,
  NavLink,
  Route,
  Routes,
} from 'react-router-dom';
import './App.scss';
import { HomePage } from './components/HomePage';
import { NotFoundPage } from './components/NotFoundPage';
import { PeopleList } from './components/PeopleList';

const App = () => (
  <section className="hero is-info is-fullheight">
    <div className="hero-head">
      <nav className="navbar">
        <div className="container">
          <div className="navbar-brand">
            <Link className="navbar-item" to="/home">
              <span className="is-size-1">Home</span>
            </Link>
          </div>
          <div id="navbarMenuHeroB" className="navbar-menu">
            <div className="navbar-end">
              <NavLink
                to="/"
                className={({ isActive }) => {
                  return (isActive ? 'navbar-item is-active' : 'navbar-item');
                }}
              >
                Home page
              </NavLink>

              <NavLink
                to="people"
                className={({ isActive }) => {
                  return (isActive ? 'navbar-item is-active' : 'navbar-item');
                }}
              >
                People page
              </NavLink>
            </div>
          </div>
        </div>
      </nav>
    </div>

    <Routes>
      <Route path="/" element={<HomePage />} />
      <Route path="home" element={<Navigate to="/" />} />
      <Route path="people" element={<PeopleList />} />
      <Route path="*" element={<NotFoundPage />} />
    </Routes>

  </section>
);

export default App;
