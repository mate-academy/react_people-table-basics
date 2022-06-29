import { Link } from 'react-router-dom';

export const Header = () => {
  return (
    <div className="App">
      <h1>People table</h1>
      <nav className="nav">
        <Link
          to="/home"
          className="nav__link"
        >
          Home
        </Link>
        <Link
          to="people"
          className="nav__link"
        >
          People
        </Link>
      </nav>
    </div>
  );
};
