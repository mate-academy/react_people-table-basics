import { NavLink } from 'react-router-dom';

export const Header:React.FC = () => (
  <nav>
    <NavLink to="/">Home</NavLink>
    <NavLink to="/people">People</NavLink>
  </nav>
);
