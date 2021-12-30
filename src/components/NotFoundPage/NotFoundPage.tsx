import { Link } from 'react-router-dom';

export const NotFoundPage = () => (
  <div className="NotFoundPage">
    The address does not exist, please go back
    <Link to="/"> Home</Link>
  </div>
);
