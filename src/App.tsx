import { HomePage} from './pages/HomePage';
import { PeoplePage } from './pages/PeoplePage';
import { NotFoundPage } from './pages/NotFoundPage';
import classNames from 'classnames';
import './App.scss';
import { NavLink,Route,Routes} from 'react-router-dom';
 'react-router-dom';

 import React from 'react';

export const App: React.FC = () => {

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
          <NavLink 
            to='/' 
            className={
              ({ isActive }) => classNames('navbar-item', { 'has-background-grey-lighter': isActive })
            }
            >
            Home
          </NavLink>

          <NavLink
            to="/people"
            className={
              ({ isActive }) => classNames('navbar-item', { 'has-background-grey-lighter': isActive })
            }
          >
            People
          </NavLink>
        </div>
      </div>
    </nav>

    <main className="section">
      <div className="container">
        <Routes>
      <Route path="/" element={<HomePage/>}/>
      <Route path="people" element={<PeoplePage/>}> 
            <Route index element={<PeoplePage/>}/>
          <Route path=':slug' element={<PeoplePage/>}/>
      </Route>
      <Route path="*" element={<NotFoundPage/>}/>
        </Routes>
            </div>
            </main>
            </div>
)
};
