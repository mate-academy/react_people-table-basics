import './App.scss';
import { MainLayout } from './components/MainLayout/MainLayout';
import { Root } from './Root';

export const App: React.FC = () => {
  return (
    <div data-cy="app">
      <MainLayout />

      <main className="section">
        <div className="container">
          <Root />
        </div>
      </main>
    </div>
  );
};
