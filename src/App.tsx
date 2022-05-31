import { Link, Route, Routes } from 'react-router-dom';
import './App.scss';
import { PeoplePage } from './component/PeoplePage/PeoplePage';
import { HomePage } from './component/HomePage/HomePage';
import { ErrorPage } from './component/ErrorPage/ErrorPage';

const App:React.FC = () => {
  return (
    <>
      <header className="header">
        <nav className="header__nav">
          <Link to="/" className="header__nav-item">HomePage</Link>
          <Link to="/people" className="header__nav-item">PeoplePage</Link>
        </nav>
      </header>

      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/people" element={<PeoplePage />} />
        <Route path="*" element={<ErrorPage />} />
      </Routes>
    </>
  );
};

export default App;
