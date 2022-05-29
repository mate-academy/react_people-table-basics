import { Routes, Route, Navigate } from 'react-router-dom';
import { HomePage } from './components/HomePage/HomePage';
import { PeoplePage } from './components/PeoplePage/PeoplePage';
import { NotFoundPage } from './components/NotFoundPage/NotFoundPage';
import { Header } from './components/Header/Header';
import './App.scss';
import 'bulma';

const App: React.FC = () => {
  return (
    <div className="container">
      <Header />
      <section className="section">
        <div className="columns">
          <div className="column">
            <Routes>
              <Route path="/" element={<HomePage />} />
              <Route path="/people" element={<PeoplePage />} />
              <Route path="/home" element={<Navigate replace to="/" />} />
              <Route path="*" element={<NotFoundPage />} />
            </Routes>
          </div>
        </div>
      </section>
    </div>
  );
};

export default App;
