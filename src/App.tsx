import './App.scss';
import { Outlet } from 'react-router-dom';
import { MainNav } from './components/MainNav';

export const App: React.FC = () => {
  return (
    <>
      <MainNav />
      <div data-cy="app">
        <main className="section">
          <div className="container">
            <Outlet />
          </div>
        </main>
      </div>
    </>
  );
};
