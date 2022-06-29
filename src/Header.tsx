import { Link } from 'react-router-dom';

export const Header : React.FC = () => (
  <nav>
    <Link to="/">Home</Link>
    <Link to="/people">People</Link>
  </nav>
);
