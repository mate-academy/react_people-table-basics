import './App.scss';
import { Header } from './components/Header';
import { Outlet } from 'react-router-dom';

export const App = () => {
  return (
    <div data-cy="app">
      <Header />
      <div className="section">
        <div className="container">{<Outlet />}</div>
      </div>
    </div>
  );
};
