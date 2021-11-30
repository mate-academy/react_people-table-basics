import { NavLink as Link } from 'react-router-dom';
import './Header.scss';

export const Header = () => {
  return (
    <div className="header">
      <Link className={(navData) => (navData.isActive ? 'active-link' : '')} to="/home">
        Home
      </Link>
      <Link
        className={(navData) => (navData.isActive ? 'active-link' : '')}
        to="/people"
      >
        People table

      </Link>
    </div>
  );
};
