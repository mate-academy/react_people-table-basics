import './App.scss';
import { NavBar } from './components/NavBar';
import { MainRoutes } from './components/MainRoutes';

export const App = () => {
  return (
    <div data-cy="app">
      <NavBar />

      <main className="section">
        <MainRoutes />
      </main>
    </div>
  );
};
