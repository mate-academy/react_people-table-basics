// import { Loader } from './Loader';
import 'bulma/css/bulma.css';
import '@fortawesome/fontawesome-free/css/all.css';
import './App.scss';
import React from 'react';
import {
  //Link,
  Outlet,
  NavLink,
  //useParams,
  useLocation,
  // useParams,
  Link,
  useParams,
} from 'react-router-dom';
import classNames from 'classnames';

import './App.scss';
interface Options {
  isActive: boolean;
}
const getLinkActive = ({ isActive }: Options) => {
  return classNames('navbar-item', { 'has-background-grey-lighter': isActive });
};

const getLinkStyle = ({ isActive }: Options) => ({
  color: isActive ? 'red' : '',
});

export const App = () => {
  const { search } = useLocation();
  const { slug } = useParams();

  return (
    <div data-cy="app">
      <nav
        data-cy="nav"
        className="navbar is-fixed-top has-shadow"
        role="navigation"
        aria-label="main navigation"
      >
        <div className="container">
          <div className="navbar-brand">
            <Link to="/" className="navbar-item">
              <img src="/logo.svg" alt="MA" className="logo" />
            </Link>
            <NavLink to="/" className={getLinkActive} style={getLinkStyle}>
              Home
            </NavLink>
            <NavLink to="people" className={getLinkActive} style={getLinkStyle}>
              People
            </NavLink>
            {slug && (
              <NavLink
                to={`${slug}`}
                className={getLinkActive}
                style={getLinkStyle}
              >
                {slug}
              </NavLink>
            )}

            {/*<a className="navbar-item" href="#/">
              Home
            </a>

            <a
              className="navbar-item has-background-grey-lighter"
              href="#/people"
            >
              People
            </a>*/}
          </div>
        </div>
      </nav>

      {/*<main className="section">
        <div className="container">
          <h1 className="title">Home Page</h1>
          <h1 className="title">People Page</h1>
          <h1 className="title">Page not found</h1>

          <div className="block">
            <div className="box table-container">
              {false && <Loader />}

              <p data-cy="peopleLoadingError" className="has-text-danger">
                Something went wrong
              </p>

              <p data-cy="noPeopleMessage">There are no people on the server</p>

              <table
                data-cy="peopleTable"
                className="table is-striped is-hoverable is-narrow is-fullwidth"
              >
                <thead>
                  <tr>
                    <th>Name</th>
                    <th>Sex</th>
                    <th>Born</th>
                    <th>Died</th>
                    <th>Mother</th>
                    <th>Father</th>
                  </tr>
                </thead>

                <tbody>
                  <tr data-cy="person">
                    <td>
                      <a href="#/people/jan-van-brussel-1714">
                        Jan van Brussel
                      </a>
                    </td>

                    <td>m</td>
                    <td>1714</td>
                    <td>1748</td>
                    <td>Joanna van Rooten</td>
                    <td>Jacobus van Brussel</td>
                  </tr>

                  <tr data-cy="person">
                    <td>
                      <a href="#/people/philibert-haverbeke-1907">
                        Philibert Haverbeke
                      </a>
                    </td>

                    <td>m</td>
                    <td>1907</td>
                    <td>1997</td>

                    <td>
                      <a
                        className="has-text-danger"
                        href="#/people/emma-de-milliano-1876"
                      >
                        Emma de Milliano
                      </a>
                    </td>

                    <td>
                      <a href="#/people/emile-haverbeke-1877">
                        Emile Haverbeke
                      </a>
                    </td>
                  </tr>

                  <tr data-cy="person" className="has-background-warning">
                    <td>
                      <a href="#/people/jan-frans-van-brussel-1761">
                        Jan Frans van Brussel
                      </a>
                    </td>

                    <td>m</td>
                    <td>1761</td>
                    <td>1833</td>
                    <td>-</td>

                    <td>
                      <a href="#/people/jacobus-bernardus-van-brussel-1736">
                        Jacobus Bernardus van Brussel
                      </a>
                    </td>
                  </tr>

                  <tr data-cy="person">
                    <td>
                      <a
                        className="has-text-danger"
                        href="#/people/lievijne-jans-1542"
                      >
                        Lievijne Jans
                      </a>
                    </td>

                    <td>f</td>
                    <td>1542</td>
                    <td>1582</td>
                    <td>-</td>
                    <td>-</td>
                  </tr>

                  <tr data-cy="person">
                    <td>
                      <a href="#/people/bernardus-de-causmaecker-1721">
                        Bernardus de Causmaecker
                      </a>
                    </td>

                    <td>m</td>
                    <td>1721</td>
                    <td>1789</td>

                    <td>
                      <a
                        className="has-text-danger"
                        href="#/people/livina-haverbeke-1692"
                      >
                        Livina Haverbeke
                      </a>
                    </td>

                    <td>
                      <a href="#/people/lieven-de-causmaecker-1696">
                        Lieven de Causmaecker
                      </a>
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </main>*/}
      <div className="section">
        {/*<p className="title is-5 has-text-info">{pathname}</p>*/}
        {search && (
          <p className="title is-6">
            {search && search.replaceAll('&', ' & ')}
          </p>
        )}

        <div className="container">
          <Outlet />
        </div>
      </div>
    </div>
  );
};
