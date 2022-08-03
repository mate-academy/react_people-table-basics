import './App.scss';
import { Route, Routes } from 'react-router-dom';
import { PeoplePage } from './components/PeoplePage';
import { HomePage } from './components/HomePage';
import { Header } from './components/UIComponents/Header';
import Footer from './components/UIComponents/Footer';
import NotFoundPage from './components/NotFoundPage';

const App = () => (
  <div className="App">
    <Header />
    <main>
      <Routes>
        <Route
          path="/people"
          element={<PeoplePage />}
        />
        <Route
          path="/"
          element={<HomePage />}
        />
        <Route
          path="*"
          element={<NotFoundPage />}
        />
      </Routes>
    </main>
    <Footer />
  </div>
);

export default App;
