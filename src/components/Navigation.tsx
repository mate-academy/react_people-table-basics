import { NavLink } from 'react-router-dom';
import 'bulma/css/bulma.min.css';
import { Button } from 'react-bulma-components';
import classNames from 'classnames';

export const Navigation: React.FC = () => {
  const activeClass = (isActive: boolean): string => {
    return (
      classNames({
        'is-active': isActive,
      })
    );
  };

  return (
    <nav className="App__nav">
      <NavLink
        to="/home"
        className={({ isActive }) => activeClass(isActive)}
      >
        <Button>Home</Button>
      </NavLink>

      <NavLink
        to="/table"
        className={({ isActive }) => activeClass(isActive)}
      >
        <Button>People</Button>
      </NavLink>
    </nav>
  );
};
