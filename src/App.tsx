import './App.scss';
import { Link } from 'react-router-dom';
import { PeoplePage } from './components/PeoplePage';

export const App = () => (
  <div data-cy="app">
    <nav
      data-cy="nav"
      className="navbar is-fixed-top has-shadow"
      role="navigation"
      aria-label="main navigation"
    >
      <div className="container">
        <div className="navbar-brand">
          <Link
            to='/'
            className='navbar-item'
          >
            Home
          </Link>

          <Link
            to='/people'
            className='navbar-item has-background-grey-lighter'
          >
            People
          </Link>
        </div>
      </div>
    </nav>

    <main className="section">
      <div className="container">

        <h1 className="title">Home Page</h1>

        <h1 className="title">Page not found</h1>

        <PeoplePage />

      </div>
    </main>
  </div>
);
