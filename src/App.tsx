import './App.scss';
import { Navbar } from './components/Navbar/Navbar';

export const App = ({ children }: { children: React.ReactNode }) => (
  <div data-cy="app">
    <Navbar />

    <main className="section">
      <div className="container">{children}</div>
    </main>
  </div>
);
