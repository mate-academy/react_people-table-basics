import { NavLink, Outlet } from 'react-router-dom';
import cn from 'classnames';
import 'bulma/css/bulma.css';
import './App.scss';
// import { HomePage } from './components/HomePage';

const App = () => {
  return (
    <div className="App">
      <NavLink
        to="/home"
        className={({ isActive }) => cn('Link', { isActive })}
      >
        Home
      </NavLink>
      {' '}
      |
      {' '}
      People
      <NavLink
        to="/people"
        className={({ isActive }) => cn('Link', { isActive })}
      >
        People
      </NavLink>

      <Outlet />
    </div>
  );
};

export default App;
