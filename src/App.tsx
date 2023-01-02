import { PageNavigation } from './components/PageNavigation';
import { MainSection } from './components/MainSection';
import './App.scss';

export const App = () => (
  <div data-cy="app">
    <PageNavigation />
    <MainSection />
  </div>
);
