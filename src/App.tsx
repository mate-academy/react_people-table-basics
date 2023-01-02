import './App.scss';
import { PageNavigation } from './components/PageNavigation';
import { MainSection } from './components/MainSection';

export const App = () => (
  <div data-cy="app">
    <PageNavigation />
    <MainSection />
  </div>
);
