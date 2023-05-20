import { Route, Routes } from 'react-router-dom';
import { Loader } from './components/Loader';
import './App.scss';
import { HomePage } from './components/HomePage';
import { Navbar } from './components/Navbar';

export const App = () => (
  <div data-cy="app">
    <Navbar />

    <main className="section">
      <Loader />
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/people" />
      </Routes>

    </main>
  </div>
);
