import {
  Navigate,
  Route,
  Routes,
} from 'react-router-dom';
import './App.scss';
import { Header } from './components/header';
import { HomePage } from './components/homePage';
import { PeoplePage } from './components/peoplePage';

const App = () => (
  <div className="App">
    <Header />

    <Routes>
      <Route path="/" element={<HomePage />} />
      <Route path="home" element={<Navigate to="/" replace />} />
      <Route path="/people" element={<PeoplePage />} />

      <Route path="*" element={<p>Page not found</p>} />
    </Routes>
  </div>
);

export default App;
