import { Route, Routes } from 'react-router-dom';
import './App.scss';
import { HomePage } from './components/HomePage';
import { Navbar } from './components/Navbar';
import { PeoplePage } from './components/PeoplePage';

export const App = () => (
  <div data-cy="app">
    <Navbar />

    <main className="section">
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/people">
          <Route index element={<PeoplePage />} />
        </Route>
      </Routes>

    </main>
  </div>
);
