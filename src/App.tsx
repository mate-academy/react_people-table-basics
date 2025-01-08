import React from 'react';
import { NavLink, Routes, Route } from 'react-router-dom';

import './App.scss';
import { PeoplePages } from './components/PeoplePages';
import classNames from 'classNames';

const isActivePage = ({ isActive }: { isActive: boolean }) =>
  classNames('navbar-item', { 'has-background-grey-lighter': isActive });

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
          <NavLink className={isActivePage} to="">
            Home
          </NavLink>

          <NavLink className={isActivePage} to="people">
            People
          </NavLink>
        </div>
      </div>
    </nav>

    <main className="section">
      <div className="container">
        <Routes>
          <Route path="">
            <Route index element={<h1 className="title">Home Page</h1>} />
            <Route path="people/:index?" element={<PeoplePages />} />
            <Route
              path="*"
              element={<h1 className="title">Page not found</h1>}
            />
          </Route>
        </Routes>
      </div>
    </main>
    {/* <tr data-cy="person">
                  <td>
                    <a href="#/people/jan-van-brussel-1714">Jan van Brussel</a>
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
                    <a href="#/people/emile-haverbeke-1877">Emile Haverbeke</a>
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
                </tr> */}
  </div>
);
