import './App.scss';
import { NavBar } from './components/NavBar';
import { Section } from './components/Section';

export const App = () => (
  <div data-cy="app">
    <NavBar />

    <Section />
  </div>
);
