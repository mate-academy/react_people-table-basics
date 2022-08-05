import {
  Navigate,
  Route,
  Routes,
} from 'react-router-dom';
import './App.scss';
import { Header } from './components/Header';
import { HomePage } from './components/HomePage';
import { NotFoundPage } from './components/NotFoundPage';
import { PeopleList } from './components/PeopleList';

const App = () => (
  <section className="hero is-info is-fullheight">
    <div className="hero-head">
      <Header />
    </div>

    <Routes>
      <Route path="/" element={<HomePage />} />
      <Route path="home" element={<Navigate to="/" replace />} />
      <Route path="people" element={<PeopleList />} />
      <Route path="*" element={<NotFoundPage />} />
    </Routes>

  </section>
);

export default App;
