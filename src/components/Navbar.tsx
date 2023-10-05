import classNames from 'classnames';
import { NavLink } from 'react-router-dom';
import { Person } from '../types';

type NavbarProps = {
  setPeople: React.Dispatch<React.SetStateAction<Person[] | null>>
};

type Active = {
  isActive: boolean
};

export const Navbar = ({ setPeople }: NavbarProps) => {
  const linkClass = (active: Active) => classNames('navbar-item', {
    'has-background-grey-lighter': active.isActive,
  });

  return (
    <div className="navbar-brand">
      <NavLink
        onClick={() => setPeople(null)}
        to="/"
        className={linkClass}
      >
        Home
      </NavLink>

      <NavLink
        to="people"
        className={linkClass}
      >
        People
      </NavLink>
    </div>
  );
};
