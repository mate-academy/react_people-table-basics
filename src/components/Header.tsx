import { Link } from 'react-router-dom';

export const Header = () => (
  <>
    <Link
      to="/"
      className="button is-info is-light"
    >
      Home
    </Link>
    <Link
      to="/people"
      className="button is-info is-light"
    >
      People
    </Link>
  </>
);
