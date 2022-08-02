import { Link } from 'react-router-dom';
import './Navigation.css';

const Navigation = () => (
  <div className="nav">
    <Link className="nav__link" to="/home">Home</Link>
    <Link className="nav__link" to="/people">People</Link>
  </div>
);

export default Navigation;
