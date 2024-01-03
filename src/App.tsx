import {
  NavLink,
  Navigate,
  Route,
  Routes,
} from 'react-router-dom';
import classNames from 'classnames';
// import { Loader } from './components/Loader';
import './App.scss';
import { HomePage } from './pages/HomePage';
import { NotFoundPage } from './pages/NotFoundPage';
import { PeoplePage } from './pages/PeoplePage';

const getLinkActive
  = ({ isActive }: { isActive: boolean }) => classNames('navbar-item', {
    'has-background-grey-lighter': isActive,
  });

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
          <NavLink to="/" className={getLinkActive}>Home</NavLink>
          <NavLink to="/people" className={getLinkActive}>People</NavLink>
        </div>
      </div>
    </nav>

    <main className="section">
      <div className="container">
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="home" element={<Navigate to="/" replace />} />
          <Route path="people">
            <Route index element={<PeoplePage />} />
            <Route path=":slug" element={<PeoplePage />} />
          </Route>
          <Route path="*" element={<NotFoundPage />} />
        </Routes>
        {/*
        <div className="block">
          <div className="box table-container">
            <Loader />

            <p data-cy="peopleLoadingError" className="has-text-danger">
              Something went wrong
            </p>

            <p data-cy="noPeopleMessage">
              There are no people on the server
            </p>

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
        </div> */}
      </div>
    </main>
  </div>
);
