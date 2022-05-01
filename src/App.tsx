import './App.scss';
import {
  Link,
  Route,
  Routes,
  Navigate,
} from 'react-router-dom';
import { Home } from './components/Home/Home';
import { People } from './components/People/People';
import { NotFoundPage } from './components/NotFoundPage/NotFoundPage';

const App: React.FC = () => {
  return (
    <div className="App">
      <nav>
        <div className="nav">
          <Link className="nav__link" to="/">Home page</Link>
          <Link className="nav__link" to="/people">People page</Link>
        </div>
      </nav>

      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/people" element={<People />} />
        <Route path="*" element={<NotFoundPage />} />
        <Route path="/home" element={<Navigate replace to="/" />} />
      </Routes>
    </div>
  );
};

export default App;
