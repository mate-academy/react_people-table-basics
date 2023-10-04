import './App.scss';
import { Navigation } from './components/Navigation/Navigation';
import { Root } from './Root';

export const App: React.FC = () => {
  return (
    <div data-cy="app">
      <Navigation />

      <main className="section">
        <div className="container">
          <Root />
        </div>
      </main>
    </div>
  );
};
