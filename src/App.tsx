import './App.scss';
import { MainContent } from './MainContent';
import { NavBar } from './NavBar';

export const App = () => {
  return (
    <div data-cy="app">
      <NavBar />
      <MainContent />
    </div>
  );
};
