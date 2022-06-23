import { Link } from 'react-router-dom';

export const Header = () => {
  return (
    <div className="App">
      <h1>People table</h1>
      <nav className="nav">
        <Link
          to="/"
          className="nav__link"
        >
          Home
        </Link>
        <Link
          to="peoplepage"
          className="nav__link"
        >
          People
        </Link>
      </nav>
    </div>
  );
};
