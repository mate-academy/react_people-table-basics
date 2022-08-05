import { Link } from 'react-router-dom';

export const Header = () => (
  <nav>
    <Link to="/">Home page</Link>
    <br />
    <Link to="/people">People page</Link>
  </nav>
);
