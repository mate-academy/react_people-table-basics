import './App.scss';
import 'bulma';
import { Link, Outlet } from 'react-router-dom';
import { Header } from './Header/Header';

const App = () => {
  return (
    <>
      <Header />
      <nav className="has-text-centered my-5">
        <div>
          <Link
            className="button is-primary mx-6"
            to="/home"
          >
            Home page
          </Link>
          <Link
            className="button is-primary mx-6"
            to="people"
          >
            People Page
          </Link>
        </div>
      </nav>
      <Outlet />
    </>
  );
};

export default App;
