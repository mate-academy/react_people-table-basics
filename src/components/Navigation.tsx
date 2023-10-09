import { NavLink } from 'react-router-dom';
import cn from 'classnames';

const getLinkClass = ({ isActive }: { isActive: boolean }) => cn(
  'navbar-item', {
    'has-background-grey-lighter': isActive,
  },
);

export const Navigation: React.FC = () => (
  <div className="navbar-brand">
    <NavLink
      className={getLinkClass}
      to="/"
      end
    >
      Home
    </NavLink>

    <NavLink
      className={getLinkClass}
      to="/people"
    >
      People
    </NavLink>
  </div>
);
