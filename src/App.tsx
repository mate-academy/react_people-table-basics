import classNames from 'classnames';
import './App.scss';
import { Outlet } from 'react-router-dom';
import { Navbar } from './components/Navbar';

export const getLinkClass = ({ isActive }: { isActive: boolean }) => classNames(
  'navbar-item',
  {
    'has-background-grey-lighter': isActive,
  },
);

export const App = () => (
  <div data-cy="app">
    <Navbar />
    <main className="section">
      <div className="container">
        <Outlet />
      </div>
    </main>
  </div>
);
