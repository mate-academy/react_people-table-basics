import { Link } from 'react-router-dom';

export const Navigation: React.FC = () => (
  <nav className="has-text-centered my-5">
    <div>
      <Link
        className="button is-primary mx-6"
        to="/"
      >
        Home page
      </Link>
      <Link
        className="button is-primary mx-6"
        to="people"
      >
        People Page
      </Link>
    </div>
  </nav>
);
