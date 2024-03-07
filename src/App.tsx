import './App.scss';
import { MainSection } from './components/MainSection/MainSection';
import { Navbar } from './components/Navbar/Navbar';

export const App = () => (
  <div data-cy="app">
    <Navbar />
    <MainSection />
  </div>
);
